const express = require('express');
const routers = express.Router();
require('./connection');
const Product = require('./Product');
const multer = require('multer');

routers.get('/products', async (req, res) => {
  const products = await Product.find();

  products ? res.send({
    status: 'success',
    message: 'list Products',
    data: products,
  }) : res.send({
    status: 'success',
    message: 'list Products tidak ditemukan',
  });
});

routers.get('/product/:id', async (req, res) => {
  const product = await Product.findById({ _id: req.params.id });
  product ? res.send({
    status: 'success',
    message: 'single Product',
    data: product,
  }) : res.send({
    status: 'warning',
    message: 'single Product tidak ditemukan',
  });
});

routers.post('/product', multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;

  try {
    const product = await Product.create({ name, price, stock, status });

    product ? res.send({
      status: 'success',
      message: 'tambah product success',
      data: product,
    }) : res.send({
      status: 'warning',
      message: 'tambah product fail',
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

routers.put('/product/:id', multer().none(), async (req, res) => {
  const { name, price, stock, status } = req.body;
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { name, price, stock, status },
      { runValidators: true },
    );

    result.matchedCount === 1 ? res.send({
      status: 'success',
      message: 'update product success',
      data: result,
    }) : res.send({
      status: 'warning',
      message: 'update product fail',
      data: result,
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

routers.delete('/product/:id', async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });

    result.deletedCount === 1 ? res.send({
      status: 'success',
      message: 'delete product success',
      data: result,
    }) : res.send({
      status: 'warning',
      message: 'delete product fail',
      data: result,
    });
  } catch (error) {
    res.send({
      status: 'error',
      message: error.message,
    });
  }
});

module.exports = routers;