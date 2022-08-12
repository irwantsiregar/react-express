[![Build Status](https://github.com/Automattic/mongoose/workflows/Test/badge.svg)](https://github.com/mongodb/node-mongodb-native)
[![NPM version](https://badge.fury.io/js/mongodb.svg)](http://badge.fury.io/js/mongodb)
[![npm](https://nodei.co/npm/mongodb.png)](https://www.npmjs.com/package/mongodb)

# 👨‍💻📚Learn MongoDB and operation using CLI

## Apa itu NoSQL Database?
[NoSQL](https://en.wikipedia.org/wiki/MongoDB) ("non-SQL" or "non-relational or Not only SQL") merupakan database yang menyediakan mekanisme penyimpanan dan pembacaan data melalui model non tabular yaitu document, key-value, dan graph.

### Jenis-Jenis NoSQL Database:
- document database
- key-value database
- wide-column database
- graph database

Untuk mengetahui DBMS yang diurutkan berdasarkan popularitasnya dapat mengunjungi halaman web [DBEngines](https://db-engines.com/en/ranking).

MongoDB merupakan database dengan menggunakan model document base, yang menyimpan datanya dalam bentuk dokumen yang mirip dengan JSON.

Bentuk data pada pada MongoDB, seperti berikut:
```json
{
  "_id": "5cf0029caff5056591b0ce7d",
  "firstname": "David",
  "lastname": "Mark",
  "address": {
    "street": "101 apple",
    "city": "New York",
    "state": "NY",
    "zip": "60234"
  },
  "hobbies": ["ui/design", "typing code"]
}
```

#### Padanan istilah antara SQL database(RDMS) dengan MongoDB:
`SQL`
- database
- table
- row
- column
- index
- table joins
- primary key

`DB MongoDB`
- database
- collection
- document atau BSON document
- field
- index
- $lookup, embedded documents
- primary key

> **Note:** pada MongoDB, primary key otomatis diset sebagai field _id.


#### Download or Installation [MongoDB](https://www.mongodb.com/try/download/community)


### Menjalankan Query Pada MongoDB Shell
Ketika sudah menginstalasi mongoDB maka secara otomatis telah terinstalasi juga tools mongoDB Shell.
Untuk memastikan apakah shell telah terinstalasi dengan baik, gunakan perintah:
```bash
$ mongosh --nodb
```

### Menampilkan & Membuat Database
Untuk melihat database yang ada di dalam MongoDB
```bash
$ mongosh atau mongosh --quiet
```
> **NOTE:** Parameter `--quiet` disini opsional, digunakan untuk hidden beberapa informasi tentang MongoDB.

```bash
> show databases; 
  atau
> show dbs;
```
Secara default terdapat tiga database bawaan MongoDB yaitu `admin, config dan local`.

Untuk menampilkan database yang sedang digunakan oleh user,gunakan perintah: `db`.
```bash
> db
test
```
Database test adalah database default jika kita tidak mendefinisikan untuk menggunakan database tertentu.

Untuk membuat dan menggunakan database, gunakan perintah 'use' diikuti nama databasenya.
```bash
> use latihan
```

## Membuat Collections
Untuk membuat collection(tabel pada RDMS) pada database latihan maka setelah perintah use latihan jalankan perintah `db.[nama collection].[perintah insert data]`
Perintah diatas akan membuat database latihan jika belum ada dan kemudian menggunakannya.
```bash
> db.quotes.insertOne({ word: 'ora eat labora' });
```
Atau untuk menambah lebih dari satu dokumen data, gunakan perintah `insertMany()`: 
```bash
> db.quotes.insertMany([ { word: 'Gitu aja kok repot' },
  { word: 'Bahagia adalah segalanya' },
  { word: 'Percaya pada diri sendiri' },
  ]);
```
Untuk menampilkan semua collection pada current database, gunakan perintah:
```bash
> show collections;
quotes
```
> **Note:** Bisa juga membuat sebuah collection kosong melalui perintah: `db.createCollection("quotes")`. 
> Untuk menghapus collection berserta isi dokumennya gunakan perintah: `db.collection.drop()`


### Menampilkan Document Collection
Untuk menampilkan data dokumen yang tersimpan dalam suatu collection. gunakan perintah:
```bash
> db.getCollection("quotes").find();
```

### Membuat Schema Data for Collection
Menggunakan MongoDB tidak perlu membuat skema data ketika ingin membuat/menambahkan dokumen pada collection.
Cukup langsung insert data, maka MongoDB akan mendeteksi tipe datanya.
```bash
> db.products.insertOne({ name: "Monitor", price: 1000000, stock: 5, status: true });
```
```bash
> db.products.insertMany([
  {name: "Monitor",price: 1000000,stock: 5,status: true},
  {name: "Keyboard",price: 200000,stock: 3,status: false},
  {name: "Mouse",price: 50000,stock: 10,status: true},
  ]);
```
Sekarang bisa menampilkan data tersebut untuk memastikan bahwa data telah berhasil masuk:
```bash
> db.products.find().pretty();
```

### Menampilkan Document Tertentu Pada Collection
 Misalnya kita ingin menampilkan data product yang statusnya true saja, gunakan perintah:
```bash
> db.products.find({ status: true });
```
Field `_id` secara default akan selalu tampil, kecuali jika mendefinisikannya sebagai field yang tidak tampil
`({ _id: false})`.

Untuk menampilkan data hasil query dengan urutan tertentu, misalnya diurutkan berdasarkan stok tertinggi, maka cukup tambahkan method `sort()` dengan argumen berupa field yang jadi acuan sorting.
```bash
> db.products.find().sort({ stock: -1 });
```
> **Note:** -1 artinya sort secara descending, sedangkan 1 artinya sort secara ascending.

Jika ingin juga membatasi jumlah dokumen yang akan ditampilkan, maka gunakan perintah:
```bash
> db.products.find().sort({ price: 1 }).limit(2);
```
Atau jika ingin menampilkan hanya satu data saja, bisa menggunakan method `limit()` atau `findOne()`.
```bash
> db.products.findOne();
```
Untuk mengetahui jumlah data yang ada pada suatu collection, gunakan method `count()`.
```bash
> db.products.count();
```

#### Menggunakan Operator
Misalnya untuk menampilkan produk dengan stok lebih dari tiga buah?
Bisa dengan menggunakan karakter `&lt` (lebih kecil dari '<') dan `&gt` (lebih besar dari '>').
```bash
> db.products.find({ stock: { $gt: 3 } });
```

#### Menggunakan Kriteria Array
 Misalnya ingin menampilkan data product dengan kriteria nama produknya monitor dan keyboard.
```bash
> db.products.find({ name: { $in: ["Monitor", "Keyboard"] } });
```

### Mengupdate Document Tertentu Pada Collection
MongoDB memiliki method untuk mengupdate dokumen pada collection, yaitu:
`db.collection.updateOne(, , ) dan db.collection.updateMany(, , )`

Misalnya untuk mengupdate data status pada collection products yaitu mengubah status dari produk keyboard menjadi true, gunakan perintah:
```bash
> db.products.updateOne( { name: "Keyboard" }, { $set: { status: true } });
```

Untuk memeriksa atau memastikan apakah status produk Keyboard sudah berganti menjadi true atau belum:
```bash
> db.products.find({name: "Keyboard"})
```

Untuk mengupdate lebih dari satu atau banyak data yang sesuai dengan kriteria tertentu pada collections, gunakan perintah:
```bash
> db.products.updateMany([
  {name: "Monitor"}, { $set: { status: false } },
  {name: "Keyboard"}, { $set: { status: true} },
  {name: "Mouse"}, { $set: { status: false } },
  ]);
```

### Menghapus Document Tertentu Pada Collection
MongoDB memiliki method untuk menghapus dokumen pada collection, yaitu:
```bash
db.collection.deleteOne(); dan db.collection.deleteMany();
```

Misalnya jika ingin menghapus satu data produk yang statusnya false, gunakan perintah:
```bash
> db.products.deleteOne({status: false});
```

Untuk menghapus lebih dari satu atau banyak data sekaligus sesuai berdasarkan kriteria tertentu, gunakan perintah:
```bash
> db.products.updateMany({status: false});
```

### Authentication
MongoDB tentunya juga mendukung authentication yaitu mekanisme keamanan untuk membatasi hak akses terhadap suatu database.

Untuk mengaktifkan authentication, maka perlu menambahkan parameter --auth ketika menjalankan server mongoDB mongod --auth. Atau jika kita menjalankan mongod menggunakan file konfigurasi maka tambahkan `security: authorization: enabled`.

### Role MongoDB
User pada database MongoDB menyediakan role-role tertentu sesuai dengan hak aksesnya untuk melakukan suatu action atau query tertentu pada database.
Hak akses pada MongoDB dapat kita set untuk semua database atau untuk database tertentu saja.
- read => hak akses yang hanya membaca database
- readWrite => hak akses yang dapat membaca dan menulis pada database
- dbAdmin => hak akses yang lebih tinggi dari readWrite mencakup tugas-tugas administrasi seperti perubahan skema, indexing, statistik
- userAdmin => hak akses terkait manajemen role pada database
- dbOwner => hak aksesnya kombinasi antara dbAdmin dan userAdmin
- readAnyDatabase => sama seperti read tapi untuk semua database
- readWriteAnyDatabase => sama seperti readWrite tapi untuk semua database
- userAdminAnyDatabase => sama seperti userAdmin tapi untuk semua database
- dbAdminAnyDatabase => sama seperti dbAdmin tapi untuk semua database
- root => hak akses tertinggi, bisa melakukan apapun pada suatu database atau semua database tergantung bagaimana settingnya

Selengkapnya terdapat pada halaman web [Docs MongoDB](https://docs.mongodb.com/manual/reference/built-in-roles/)


### Membuat Users
User merupakan pengguna dari database yang memiliki role tertentu sesuai dengan yang diberikan
kepadanya. Semua informasi tentang user disimpan oleh MongoDB dalam database admin atau  tepatnya pada collection `system.users`.

Untuk melihat users yang tersedia, pada mongo shell gunakan perintah:
```bash
> use admin
  db.system.users.find()
  ```
Secara Default akan menampilkan 'tidak ada user' atau kosong.

Untuk dapat membuat user baru. 
Misalnya ingin membuat user dengan role readWrite pada database latihan maka gunakan perintah:
```bash
> use admin
  db.createUser({
  user: 'user_latihan',
  pwd: '123456',
  roles: [ { role: 'readWrite', db: 'latihan' } ]
  });
```

Untuk membuat user dengan role readWriteAnyDatabse, gunakan perintah:
```bash
> use admin
  db.createUser({
  user: 'user',
  pwd: '123456',
  roles: [ 'readWriteAnyDatabase' ]  
  });
```

Untuk membuat user dengan role root, gunakan perintah:
```bash
> use admin
  db.createUser({
  user: 'root',
  pwd: '123456',
  roles: [ 'root' ]  
  });
```

Penjelasannya adalah user dengan username `root` memiliki role root pada semua database.
Setelah membuat user baru maka harus merestart server mongoDB dan pastikan authentication diaktifkan yaitu dengan menambahkan parameter `--auth` ketika menjalankan server mongoDB atau menambahkan `security.authorization` jika menggunakan konfigurasi:
Buka file konfigurasi, kemudian tambahkan syntaks berikut:
```bash
 security:
   authorization: enabled
```
> **Note:** Untuk windows, lokasi file konfigurasi adalah `<install directory>\bin\mongod.cfg`

### Login ke Mongo Shell
Oleh karena server database telah diproteksi menggunakan authentication, maka kita tidak bisa lagi menjalankan mongo shell secara langsung seperti sebelumnya mongo `--quiet`.

Cara mengakses mongo shell adalah dengan menyertakan parameter username dan password(untuk dapat login):
```bash
$ mongo --quiet -u "user_latihan" -p
Enter password:
```
Kemudian ketika ingin menjalankan perintah show databases maka hanya akan muncul database latihan saja. Hal ini karena username user_latihan hanya memiliki hak akses database latihan saja.
Untuk masuk menggunakan username user yang rolenya readWriteAnyDatabase, gunakan perintah:
```bash
$ mongo --quiet -u "user" -p
Enter password:
```
Pada saat menjalankan perintah show databases maka semua database akan muncul. Demikian juga ketika ingin masuk menggunakan user root, dst.


### Kesimpulan MongoDB
- Salah satu jenis database NoSQL.
- Cukup populer.
- Menyimpan datanya dalam bentuk dokumen yang berformat JSON.
- Mendukung perintah-perintah query dan dapat disetarakan dengan perintah query pada SQL database. 
- Menggunakan format Javascript untuk menjalankan perintah querynya.
- Perintah query tersebut dijalankan melalui tools shell.

