const express = require('express');
const routers = express.Router();
const client = require('./connection');
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');

routers.get('/products', async (req, res) => {
  if (client.isConnected()) {
    const db = client.db('latihan');
    const products = await db.collection('products').find().toArray();

    products ? res.send({
      status: 'success',
      message: 'List Products',
      data: products,
    }) : res.send({
      status: 'success',
      message: 'List Products tidak ditemukan',
    });
  } else {
    res.send({
      status: 'error',
      message: 'Koneksi database gagal'
    });
  }
});

routers.get('/product/:id', async (req, res) => {
  if (client.isConnected()) {
    const id = req.params.id;
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id;

    const db = client.db('latihan');
    const product = await db.collection('products').findOne({ _id: _id });

    product ? res.send({
      status: 'success',
      message: 'Single Product',
      data: product,
    }) : res.send({
      status: 'success',
      message: 'Single Product tidak ditemukan',
    });
  } else {
    console.log('koneksi database gagal');
  }
});

routers.post('/product', multer().none(), async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const db = client.db('latihan');

    const result = await db.collection('products').insertOne({ name, price, stock, status });

    result.insertedCount == 1 ? res.send({
      status: 'success',
      message: 'Tambah product success',
    }) : res.send({
      status: 'warning',
      message: 'Tambah product fail',
    });
  } else {
    res.send('koneksi database gagal');
  }
});

routers.put('/product/:id', async (req, res) => {
  if (client.isConnected()) {
    const { name, price, stock, status } = req.body;
    const id = req.params.id;
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id;

    const db = client.db('latihan');
    const result = await db.collection('products').updateOne(
      { _id: _id },
      { $set: { name, price, stock, status } }
    );

    result.matchedCount == 1 ? res.send({
      status: 'success',
      message: 'Update product success',
    }) : res.send({
      status: 'warning',
      message: 'Update product fail',
    });
  } else {
    res.send('koneksi database gagal');
  }
});

routers.delete('/product/:id', async (req, res) => {
  if (client.isConnected()) {
    const id = req.params.id;
    const _id = (ObjectId.isValid(id)) ? ObjectId(id) : id;

    const db = client.db('latihan');
    const result = await db.collection('products').deleteOne({ _id: _id });

    result.deletedCount == 1 ? res.send({
      status: 'success',
      message: 'Delete product success',
    }) : res.send({
      status: 'warning',
      message: 'Delete product fail',
    });
  } else {
    res.send('koneksi database gagal');
  }
});

module.exports = routers;