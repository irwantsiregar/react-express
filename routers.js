const express = require('express');
const routers = express.Router();

routers.get('/', (req, res) => res.send('Hello World!'));

/* ## Menangani File Upload
 Belajar menangani file yang diupload oleh user. Bagaimana menangkap file tersebut dari form yang dikirimkan oleh user dan kemudian menyimpannya ke suatu direktori tertentu.
Menangani file upload maka kita bisa menggunakan "Multer" merupakan middleware untuk menangani file upload menggunakan multipart/form-data. Multer sendiri dibangun diatas pustaka busboy.

Kemudian definisikan direktori yang menjadi target dari file upload melalui argumen dest pada method multer. Misalnya target upload adalah direktori 'public'.

Method single pada variabel upload digunakan jika file yang diupload hanya satu file.
Argumen pada method single merupakan nama dari field 'file' pada form upload nantinya, artinya kita bisa ganti sesuai
kebutuhan kita, misal: image, photo, cover, dokumen, dll.
Jika kita ingin mengupload banyak file sekaligus maka kita bisa gunakan method array: 
  => upload.array('files').
*/
// middleware multer
const multer = require('multer');
// const upload = multer({ dest: 'public' });

// Validasi melalui argumen fileFilter pada muller
const imageFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return cb(null, false);
  }
  cb(null, true);
}
const upload = multer({ dest: 'public', fileFilter: imageFilter });


routers.post('/upload', upload.single('file'), (req, res) => {
  res.send(req.file);
});
// Nah yang menarik adalah nama file yang diupload berbeda dengan nama asilnya yaitu awalnya logo.jpg menjadi ce5f25767fb8333934443fa397142d9d, yaitu otomatis akan dihash.

const path = require('path')

/* Untuk mengubah nama filenya menjadi nama lain, maka kita bisa gunakan pustaka fs (bawaan NodeJS) melalui method renameSync.
    => fs.renameSync(oldPath, newPath)    */
const fs = require('fs');
routers.post('/upload2', upload.single('file'), (req, res) => {
  const file = req.file;
  if (file) {
    const target = path.join(__dirname, 'public', file.originalname);
    fs.renameSync(file.path, target);
    res.send('file berhasil diupload');
  } else {
    res.send('file gagal diupload');
  }
});

/* 1.Bagaimana memfilter misalnya hanya file image saja yang bisa diupload ?
  Validasi ini dimungkinan melalui argumen 'fileFilter' pada muller.
    code: const imageFilter = (req, file, cb) => {...}
          const upload = multer({ dest: 'public', fileFilter: imageFilter });
  Dengan cara ini maka apabila file yang diupload bukan image maka file tersebut tidak akan diupload oleh aplikasi
*/
routers.post('/upload3', upload.single('file'), (req, res) => {
  req.file ? res.send('file filter berhasil diupload') :
    res.send('file gagal diupload')
});


/* 2.Bagaimana jika form tidak hanya berisi file upload saja, misalnya kita ingin mengupload dua field
dimana field pertama berupa string sedangkan field kedua berupa file?
Caranya, mudah saja, dimana untuk menangkap field pertama kita bisa gunakan metode biasa yaitu
req.body.NAMA_FIELD sedangkan untuk menangkap field file kita gunakan cara sebelumnya yaitu req.file
*/
routers.post('/register', upload.single('avatar'), (req, res) => {
  const name = req.body.name
  const avatar = req.file
  res.send({ name: name, avatar: avatar });
});


/* 3.Bagaimana jika ada banyak file yang diupload sekaligus?
Caranya dengan menggunakan method array sebagai pengganti single. Formatnya adalah: upload.array(NAMA_FIELD, JUMLAH_MAX_FILE).
    routers.post('/photos/upload', upload.array('photos', 12), (req, res) => {
      // req.files is array of `photos` files
    });
Gunakan req.files untuk menangkap file photos, dimana req.files berupa array dari file photos.
*/


/* 4.Bagaimana jika ada beberapa field bertipe file dalam satu form upload?
Multer juga memiliki fitur untuk menangani kasus ini yaitu menggunakan upload.fields.
Sebagai contoh pada form terdapat dua field bertipe file yaitu avatar dan gallery.
*/
var cpUpload = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 4 }
]);

routers.post('/profile', cpUpload, function (req, res, next) {
  const avatar = req.files['avatar'][0]; //-> File
  const gallery = req.files['gallery']; //-> Array
  res.send({ avatar, gallery });
});


/* 5.Bagaimana jika filenya hanya bertipe teks saja?
  Maka gunakan multer().none(). */
routers.post('/login', multer().none(), function (req, res, next) {
  const name = req.body.name;
  res.send({ name });
});


module.exports = routers;