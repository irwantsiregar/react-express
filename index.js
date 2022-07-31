const express = require('express');
const app = express();
const port = 3000;

// #ExpressJS menyediakan mekanisme yang mudah untuk menangani kasus parameter id yaitu dengan routing dinamis.
app.get('/post/:id', (req, res) => {
  res.send(`Article-${req.params.id}`)
});

/* Cara lain untuk membuat dinamis routing adalah dengan menggunakan query string pada URL.
  Contoh: /foods
          /foods?page=2
          /foods?page=2&sort=title

Yaitu dengan menambahkan tanda tanya ? di depan nama parameter, dan untuk mendefinisikan nilai dari
parameter dengan menggunakan tanda sama dengan = diikuti nilai dari parameternya.
Jika parameternya lebih dari satu maka dipisahkan dengan tanda &
*/
app.get('/foods', (req, res) => {
  console.log(req.query);
  res.end();
});

/* Apabila kita akses dengan URL http://localhost:3000/foods?page=2&sort=title, maka pada log akan muncul: { page: '2', sort: 'title' }
  Yaitu objek yang merupakan parameter query string yang dikirimkan melalui URL. 
  Dengan pemahaman ini maka kita bisa bereksperimen untuk melakukan sesuatu berdasarkan nilai dari parameter pada query string tersebut
*/
app.get('/foodst', (req, res) => {
  const page = req.query.page ? req.query.page : 1
  res.write('Foods page: ' + page + '\n');
  if (req.query.sort) res.write('Sort by: ' + req.query.sort);
  console.log(req.query);
  res.end();
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));