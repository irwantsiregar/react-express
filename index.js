const express = require('express');
const app = express();
const port = 3000;

// # Middleware ExpressJS

/* ## Menangani CORS dengan Middleware
CORS singkatan dari cross origin resource sharing merupakan kondisi di mana suatu aplikasi web
tertentu menggunakan atau mengakses resource (web service) dari lokasi lain yang berbeda origin
(alamat domain, protokol (http or https) dan atau port-nya).
Contoh CORS: aplikasi JS yang dihosting pada alamat domain https://abc.com dengan XMLHttpRequest mengakses web service dengan alamat https://xyz.com.
Maka untuk alasan keamanan, browser secara default akan menolak akses tersebut. Itu artinya, akses resource secara default hanya diizinikan untuk mengakses ke origin yang sama.
Ketika terjadi CORS, maka browser akan otomatis menambahkan HTTP header tertentu yang menginformasikan kepada server bahwa request tersebut masuk dalam kategori CORS.
Untuk mengatasi CORS tersebut maka di sisi server perlu disetting agar request secara CORS diperbolehkan.
ExpressJS mempunyai built-in middleware untuk menangani CORS yaitu bernama 'cors'.
*/
// require module middleware cors
const cors = require('cors')
// terapkan pada objek express
app.use(cors());
/*  Namun kita bisa memberikan izin yang lebih spesifik dengan menambahkan argumen pada fungsi cors(), misalnya hanya mengizinkan request dari origin tertentu.
      var corsOptions = {
      origin: 'http://example.com'
      }
    app.use(cors(corsOptions));  
*/

/* ## Mengkompresi Response dengan Middleware
Untuk mengoptimasi response yang akan diterima oleh browser maka kita bisa mengcompress konten respon terlebih dahulu sebelum dikirimkan ke browser. 
ExpressJS juga menyediakan built-in middleware untuk mengangani hal ini yaitu 'compression'
Middleware ini akan mencompress menggunakan metode kompresi gzip.
*/
const compression = require('compression');

// deklarasi routing
const routers = require('./routers');
app.use(routers);

// middleware compression
app.use(compression());

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));