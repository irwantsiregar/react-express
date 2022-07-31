const express = require('express');
const routers = express.Router()

routers.get('/', (req, res) => res.send('Hello World!'));

routers.get('/post/:id', (req, res) => {
  if (req.params.id) res.send('Article' + req.params.id);
});

module.exports = routers;