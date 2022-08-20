const fs = require('fs');
const path = require('path');
const Product = require('./model');
const Category = require('../category/model');
const Tag = require('../tag/model');
const config = require('../config');
const { policyFor } = require('../policy');

async function store(req, res, next) {
  try {
    //--- cek policy ---/
    let policy = policyFor(req.user);

    if (!policy.can('create', 'Product')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk membuat produk`
      });
    }

    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      category ? payload = { ...payload, category: category._id } : delete payload.category;
    }

    if (payload.tags && payload.tags.length) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map(tag => tag._id) }
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')
      [req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(config.rootPath, `public/upload/${filename}`);

      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);

      src.pipe(dest);
      src.on('end', async () => {
        try {
          let product = new Product({ ...payload, image_url: filename })
          await product.save()
          return res.json(product);
        } catch (err) {
          // (1) jika error, hapus file yang sudah terupload padadirektori
          fs.unlinkSync(target_path);
          // (2) cek apakah error disebabkan validasi MongoDB
          if (err && err.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors
            })
          }
          next(err);
        }
      });
      src.on('error', async () => {
        next(err);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
  } catch (error) {
    // check error type
    if (error && error.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
}

async function index(req, res, next) {
  try {
    let { limit = 10, skip = 0, q = '', category = '', tags = [] } = req.query;
    let criteria = {};

    if (q.length) {
      criteria = { ...criteria, name: { $regex: `${q}`, $options: 'i' } };
    }

    if (tags.length) {
      tags = await Tag.find({ name: { $in: tags } });
      criteria = { ...criteria, tags: { $in: tags.map(tag => tag._id) } }
    }

    if (category.length) {
      category = await Category.findOne({ name: { $regex: `${category}` }, $options: 'i' });
      if (category) {
        criteria = { ...criteria, category: category._id };
      }
    }

    let count = await Product.find(criteria).countDocuments();
    let products = await Product.find(criteria).limit(parseInt(limit)).skip(parseInt(skip))
      .populate('category').populate('tags');
    return res.json({ data: products, count });
  } catch (error) {
    next(error);
  }
}

async function update(req, res, next) {
  try {
    //--- cek policy ---/
    let policy = policyFor(req.user);
    if (!policy.can('update', 'Product')) {
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk mengupdate produk`
      });
    }

    let payload = req.body;

    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      category ? payload = { ...payload, category: category._id } : delete payload.category;
    }

    if (payload.tags && payload.tags.length) {
      let tags = await Tag.find({ name: { $in: payload.tags } });
      if (tags.length) {
        payload = { ...payload, tags: tags.map(tag => tag._id) }
      }
    }

    if (req.file) {
      let tmp_path = req.file.path;
      let originalExt = req.file.originalname.split('.')
      [req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalExt;
      let target_path = path.resolve(config.rootPath, `public/upload/${filename}`);
      const src = fs.createReadStream(tmp_path);
      const dest = fs.createWriteStream(target_path);
      src.pipe(dest);
      src.on('end', async () => {
        try {
          let product = await Product.findOne({ _id: req.params.id });
          let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage)
          }
          product = await Product.findOneAndUpdate({ _id: req.params.id }, { ...payload, image_url: filename }, { new: true, runValidators: true });
          return res.json(product);
        } catch (err) {
          // ----- cek tipe error ---- //
          if (err && err.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: err.message,
              fields: err.errors
            });
          }
          next(err);
        }
      });
      src.on('error', async () => {
        next(err);
      });
    } else {
      // (6) update produk jika tidak ada file upload
      let product = await Product.findOneAndUpdate({ _id: req.params.id }, payload, { new: true, runValidators: true });
      return res.json(product);
    }
  } catch (err) {
    // ----- cek tipe error ---- //
    if (err && err.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: err.message,
        fields: err.errors
      });
    }
    next(err);
  }
}

async function destroy(req, res, next) {
  try {
    //--- cek policy ---/
    let policy = policyFor(req.user);
    if (!policy.can('delete', 'Product')) { // <-- can delete
      return res.json({
        error: 1,
        message: `Anda tidak memiliki akses untuk menghapus produk`
      });
    }

    let product = await Product.findOneAndDelete({ _id: req.params.id });
    let currentImage = `${config.rootPath}/public/upload/${product.image_url}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage)
    }
    return res.json(product);
  } catch (error) {
    next(error);
  }
}

module.exports = { index, store, update, destroy };