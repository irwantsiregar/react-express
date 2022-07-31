const express = require('express');
const app = express();
const port = 3000;

// # Middleware ExpressJS
/* 
Kata middleware dari sisi istilah berarti perangkat yang berada ditengah tengah.
Middleware bertindak sebagai penengah antara client request dengan pemrosesan request.
Middleware bekerja melakukan intercept pada sistem routing.
Secara umum, middleware digunakan untuk menjalankan fungsi-fungsi tertentu ketika routing tertentu
diakses.

Middleware berupa sebuah fungsi, dimana fungsi ini memiliki tiga argumen yaitu req (objek request), res
(objek response) dan next (fungsi).
*/
/* 
## Menangani Log
Misalnya kita akan membuat middleware yang berfungsi menampilkan log pada tiap request terhadap
route apapun.
Adapun data log yang ingin ditampilkan adalah:
- data waktu saat request dilakukan Date.now() (timestamp),
- ip address client req.ip dan
- route yang diakses req.originalUrl.  */

// middleware log
const log = (req, res, next) => {
  console.log(`Date: ${Date.now()} | IP: ${req.ip} | Url: ${req.originalUrl}`)
  next();
}
app.use(log);

// deklarasi routing
const routers = require('./routers');
app.use(routers);

// middleware menangani 404
const notFound = (req, res, next) => {
  res.json({
    status: 'error',
    message: 'resource tidak ditemukan',
  });
}
app.use(notFound);

/*  
## Menangani Error
Contoh lain lagi, kita juga bisa menangani error dengan menggunakan middleware, namun argumennya
sedikit berbeda, terdapat satu argumen tambahan yaitu err yang merepresentasikan objek error.

const errorHandling = (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Terjadi kesalahan')
  }
  app.use(errorHandling)

 Implementasinya, middleware ini akan menangani semua jenis error yang mungkin timbul sehingga responnya tetap dapat kita kontrol.
 Supaya lebih web service friendly maka kita bisa ubah menjadi format json. */
const errorHandling = (err, req, res, next) => {
  res.json({
    status: 'error',
    message: 'terjadi kesalahan pada server',
  });
}
app.use(errorHandling);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));