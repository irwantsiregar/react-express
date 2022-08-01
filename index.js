const express = require('express');
const app = express();
const port = 3000;

// # Middleware ExpressJS

// deklarasi routing
const routers = require('./routers');
app.use(routers);
/* 
Request dari client terkadang juga menyertakan konten melalui body, terutama request dari form, atau
terkadang request yang dikirimkan beformat JSON (application/json).
Untuk menangani request tersebut, kita bisa menggunakan middleware bawaan ExpressJS yaitu bodyparser.
Middleware ini digunakan untuk memparsing object request tepatnya pada body baik yang diencode
(application/x-www-form-url-encode) maupun yang berformat json dari request client sehingga menjadi
mudah dibaca.
*/
// const bodyParser = require('body-parser');

// Penggunaan middleware body parser //parse x-www-form-url-encode
// app.use(bodyParser.urlencoded({ extended: true }));
// parse JSON
// app.use(bodyParser.json());



/* Sejak ExpressJS versi 4.16+, fungsi middleware body-parser ini sudah built-in di dalam
express, sehingga kita tidak perlu lagi menggunakan middleware tersebut. */
// parse x-www-form-url-encode
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
// parse JSON
// app.use(bodyParser.json())
app.use(express.json())


app.listen(port, () => console.log(`Server running at http://localhost:${port}`));