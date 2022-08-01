const express = require('express');
const routers = express.Router();

routers.get('/', (req, res) => res.send('Hello World!'));

routers.get('/post/:id', (req, res) => {
  if (req.params.id) res.send('Article' + req.params.id);
});

/* 
Response dari ExpressJS tidak hanya berupa data berformat string, namun juga bisa berupa file yang
ada di server. Salah satu method yang bisa kita gunakan adalah res.sendFile()
*/
// routers.get('/download', function (req, res) {
//   const filename = 'ubd.png';
//   res.sendFile(__dirname + '/' + filename);
// });
/* Perintah __dirname akan mengembalikan direktori dari current file atau dalam hal ini routers.js. Hal ini
dilakukan sebab file yang ingin kita tampilkan (logo.png) berada pada lokasi yang sama dengan
routers.js.
String / digunakan untuk menggabungkan direktori dengan nama filenya. Sebenarnya untuk lebih
amannya, kita bisa gunakan pustaka path untuk menggabungkan direktori dengan nama filenya. */
// require dulu
const path = require('path')

routers.get('/download', function (req, res) {
  const filename = 'logo.png';
  // res.sendFile(__dirname + '/' + filename);
  // implementasinya
  res.sendFile(path.join(__dirname, filename));
});

/* 
Ketika sebuah file terdownload maka otomatis nama file yang terdonwload akan sama dengan nama file
asli di server atau dalam hal ini logo.png.
Nah, untuk alasan tertentu terkadang kita perlu mengubah nama file yang terdownload denga nama yang
berbeda dengan nama aslinya. Maka kita bisa melakukannya dengan menyisipkan header ContentDisposition sebagai argumen kedua ketika menjalankan method sendFile.
Cara ini juga berlaku untuk file jenis apapun yang ingin disediakan untuk didownload.
*/
// routers.get('/download2', function (req, res) {
//   const filename = 'logo.png';
//   res.sendFile(path.join(__dirname, filename), {
//     headers: {
//       'Content-Disposition': 'attachment; filename="logo-23bk3kh4lk29lll28.png"'
//     }
//   });
// });


/* 
sebenarnya kita bisa juga membuat file gambar itu tampil pada browser alias tidak langsung
terdownload apalagi image merupakan file yang didukung oleh browser.
Untuk melakukannya maka kita bisa sertakan jenis konten (Content-Type) dari file image tersebut
(image/png) yang kita berikan pada argumen kedua method sendFile.
*/
routers.get('/preview-image', function (req, res) {
  const filename = 'logo.png';
  res.sendFile(path.join(__dirname, filename), {
    headers: {
      'Content-Type': 'image/png'
    }
  });
});
// Menampilkan file dengan metode ini hanya cocok untuk file-file yang sifatnya private atau hanya boleh diakses oleh user tertentu saja


/* 
Jika file yang dimaksud bersifat public maka cara ini sangat tidak disarankan karena akan membebani
server aplikasi kita.
Untuk itulah kita bisa menggunakan built-in middleware yaitu "static". Sebagai contoh kita punya sebuah
direktori bernama public sebagai tempat dimana kita meletakkan file-file asset dari web kita.
  code: app.use(express.static('public'))
Catatan: Lokasi direktori public adalah relatif alias sejajar dengan file aplikasi. Lebih bagus lagi jika kita deklarasikan direktori absolutenya:
  code: app.use(express.static(path.join(__dirname, 'public')))

Dengan cara ini maka kita bisa mengakses file-file dalam folder public secara langsung. Misalnya jika di
dalam folder tersebut terdapat file contoh.pdf maka kita bisa mengaksesnya melalui URL http://localhost:3000/contoh.pdf, maka file PDF akan terbuka atau terdownload jika tidak ada plugin PDF pada browser.
Selain itu kita juga mendefinisikan routing sebagai prefik ketika mengakses file tersebut, misalnya:
  app.use('/public', express.static(path.join(__dirname, 'public')))
Maka sekarang untuk mengakses file contoh.pdf melalui URL http://localhost:3000/public/contoh.pdf.lL
*/

module.exports = routers;