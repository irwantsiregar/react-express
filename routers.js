const express = require('express');
const routers = express.Router();

routers.get('/', (req, res) => res.send('Hello World!'));

routers.get('/post/:id', (req, res) => {
  if (req.params.id) res.send('Article' + req.params.id);
});

/* 
Sebagai contoh, kita akan membuat routing login dengan method post, dimana routing ini menerima
request berupa data username dan password yang dikirim via form login.
Karena kita telah memasang middleware "body-parser" maka kita bisa mendapatkan data form
login yang dikirim oleh cient dengan cara yang cukup mudah
*/
routers.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.send(`Anda login dengan username dan password
  `);
});


module.exports = routers;