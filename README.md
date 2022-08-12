# Object Document Mapping (ODM)

### Berkenalan dengan ODM?
Object Data Mapping merupakan sebuah metode untuk memetakan data (dokumen) pada
suatu database dalam bentuk objek, sehingga akan memudahkan pengolahan data tersebut. Juga akan
memudahkan kita menentukan jenis data, hubungan antar data, validasi data dll.

ODM melakukan abstraksi dari fungsi-fungsi query database driver native, sehingga operasi query yang
akan kita lakukan nantinya akan seperti operasi pada sebuah objek.

Meskipun banyak kemudahan yang kita peroleh dengan menggunakan ODM namun karena ODM
berjalan diatas database driver native maka tentu performanya akan sedikit dibawah dibandingkan
dengan langsung menggunakan database driver native.

Pada database relasional, ODM ini dikenal sebagai ORM (Object Relational Mapping).

### Berkenalan dengan Mongoose
Salah satu tools atau framework ODM berbasis NodeJS untuk database MongoDB yang cukup populer adalah `Mongoose`.

`Mongoose` memiliki berbagai fitur diantaranya: modeling data berbasis skema, casting tipe data,
validation, query building, hook untuk business logic, dsb.

Berikut contoh penerapan kode pada mongoose:
```bash
// modeling document quotes
const Jokes = mongoose.model('Jokes', { word: String });

// membuat document baru
const jokes = new Jokes({
  word: 'A machine that turns coffee into Code'
});

// simpan document
quote.save().then(() => console.log('jokes success added'));
```

Selengkapnya kunjungi website resminya [Mongoose](https://mongoosejs.com).

Instalation Mongoose:
```bash
npm install mongoose --save
```

### Getting Started Mongoose
Pada mongoose terdapat beberapa komponen-komponen penyusunnya, yaitu schema, model dan query.

#### Mengenal Schema
Schema merepresentasikan struktur data pada suatu dokumen, terdiri dari field apa saja dan tipe datanya.
```bash
const jokesSchema = new mongoose.Schema({
  word: String // String bentuk pendek dari {type: String}
});
```

Pada mongoose, Schema memungkinkan kita untuk mendefinisikan 'default value' dari suatu field.
```bash
const studentSchema = new mongoose.Schema({
  name: String,
  nim: Number,
  grade: Number,
  status: { type: Boolean, default: true },
});
```

Berikut terdapat beberapa tipe data yang didukung oleh mongoose: 
- String
- Number
- Date
- Buffer
- Boolean
- Mixed
- ObjectId
- Array
- Decimal 128
- Map


### Mengenal Model & Document
Model merupakan konstruktor yang disusun dari definisi Schema.
Sebuah instance atau objek dari model disebut document.
Model bertanggung jawab untuk membuat dan membaca document dari database MongoDB.
Nama model biasanya ditulis dengan format PascalCase dan singular.

Berikut contoh model untuk schema employee:
```bash
const Student = mongoose.model('Student', productSchema);
```
Student yang merupakan instance dari model adalah sebuah document.

### Mengenal Query
Model pada mongoose menyediakan beberapa static helper(`fungsi`) yang berfungsi sebagai perintah
query untuk melakukan operasi CRUD. Setiap fungsi ini akan mengembalikan sebuah objek query.

Berikut beberapa contoh fungsi tersebut:
- Model.find()
- Model.findById()
- Model.findOne()
- Model.create()
- Model.updateOne()
- Model.updateMany()
- Model.deleteOne()
- Model.deleteMany()
- Model.replaceOne()

```bash
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/latihan');

// membuat schema
const studentSchema = new mongoose.Schema({
  name: String,
  nim: Number,
  grade: Number,
  status: { type: Boolean, default: true },
});

// membuat model
const Student = mongoose.model('Student', studentSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  // disini perintah query
})
```
##### Query Menampilkan List data
Untuk menampilkan list data menggunakan method find().
```bash
// menampilkan list products
await Product.find().exec((err, result)=>{
console.log(result)
})
```
Atau dengan menggunakan metode `async/await`
```bash
const students = await Student.find();
console.log(students);
```

#### Query Menampilkan Single Data
Untuk menampilkan single data/ data tunggal, maka digunakan method `findOne()`.

```bash
// menampilkan single product
const student = await Student.findOne({
_id: '7f84c193zx432bfa8abgd234'
});
console.log(student)
```
Perlu diketahui bahwa mongoose telah secara otomatis menjalankan fungsi `ObjectId()` pada field _id sehingga tidak perlu lagi memanggil secara manual fungsi tersebut.

Penggunaan dalam bentuk lain yang lebih singkat, dapat menggunakan method `findById()`.
```bash
const student = await Student.findById('7f84c193zx432bfa8abgd234')
```

#### Query Menambahkan Data Baru
Untuk menambah data baru digunakan method `create()`
```bash
const newStudent = await Student.create({
  name: 'David Charles',
  nim: 16110243,
  grade: 470,
  status: true
})
console.log(newStudent)
```

#### Query Mengupdate Suatu Data
Untuk mengupdate suatu data berdasarkan kriteria tertentu digunakan fungsi `updateOne()`.
```bash
// mengupdate data product
await Student.updateOne({ _id: '7f84c193zx432bfa8abgd234' }, { name: 'David Mark' });
```

#### Query Menghapus Suatu Data
Untuk menghapus suatu data dengan kriteria tertentu, digunakan fungsi deleteOne().
```
// menghapus data product
await Student.deleteOne( { _id: '7f84c193zx432bfa8abgd234' } );
```

#### Validation
Salah satu kelebihan dari mongoose ini adalah kemudahan dalam menerapkan validasi pada data.

Seperti query berikut:
```bash
const newStudent = await Student.create({})
console.log(newStudent); 
// Result: { status: true, _id: 407f14e62ee716d58c675d73, __v: 0 } 
```

##### Validasi Required
Validasi tersebut bisa kita definisikan pada schema yaitu dengan menambahkan key required bernilai true.
```bash
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nim: { type: Number, required: true },
  grade: Number,
  status: { type: Boolean, default: true },
});
```

Pada validasi diatas untuk pesan `error` juga dapat dilakukan custom.
```bash
name: { type: String, required: [true, 'Field name must exist.'] },
```
Untuk mendapatkan spesifik error pada field tertentu, dapat digunakan perintah:
```bash
try{
  const newStudent = await Student.create({});
  console.log(newStudent);
} catch (error) {
  const error_name = error.errors['name'] && error.errors['name'].message;
  if (error_name) console.log(error_name) // Field name must exist.
}
```

##### Validasi Min & Max
Selain itu untuk tipe string, kita juga memvalidasi panjang minimal atau maksimal karakter dengan
menggunakan minLength dan maxLength.
```bash 
name: {
  type: String,
  required: true,
  minlength: 3,
  maxlength: 50
},
```
Untuk field dengan type Number, dapat menggunakan key min dan max.
```bash 
discount: {
  type: Number,
  required: true,
  min: 1000,
  max: 1000000,
},
```

##### Validasi Enum
Validasi built-in lain yang bisa digunakan adalah validasi enum, yaitu membatasi hanya untuk data tertentu saja.
Validasi ini cocok buat data pilihan. Apabila diisi dengan jenis minuman selain dari yg terdaftar tsb maka akan menampilkan error.
```bash
drink: {
  type: String,
  required: true,
  enum: ['coffee', 'milk', 'tea']
},
```

##### Validasi Unique
Unique sebenarnya bukan validasi namun merupakan helper untuk mendefinisikan bahwa field tersebut `unique`.
Misalnya kita memiliki schema untuk collection users.

```bash
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  email: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
```
> **Note:** `unique` disini tidak akan diterapkan apabila collection telah terdapat isi, oleh karena itu silakan di hapus terlebih dahulu collection yang akan diterapkan aturan unique. 

#### Custom Validator
Jika built-in validator tidak cukup, maka dapat juga untuk membuat validasi sendiri. 
Sebagai contoh validasi email(wajib ada @), maka dapat digunakan regular expression: `/^\S+@\S+$/`.
```bash
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    validate: {
      validator: function(v) {
        return /^\S+@\S+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  password: String
});
const User = mongoose.model('User', userSchema);
```
Jika ditambahkan data user baru dengan email yang tidak valid, maka akan muncul error.


##### Query Builder
Mongoose juga menyediakan query builder, yaitu fungsi-fungsi untuk menyusun sebuah query pada query select.
Contoh query untuk menampilkan semua produk:
```bash
const query = await Student.find();
```
Selain bisa didefinisikan langsung sebagai argumen pada method `find()`, Mongoose juga menyediakan method `where()` untuk mendefinisikan kriteria dari data.

```bash
const query = await Student.find()
query.where({ 'grade': { $gte : 70} })
```
> **Note:** `$gt`(greater than '>'), `$lt`(lower than '<'), `$gte`(greater than equal '>='), dan `$lte`(lower than  '<=' ).
Hal ini bisa dilakukan karena setiap method pada model tersebut juga akan mengembalikan query.
Dapat juga menambahkan definisi query untuk menampilkan field tertentu yang ingin ditampilkan.
```bash
query.select('name grade');
```
> **Note:** Menggunakan spasi untuk memisahkan field.

Kita juga dapat menggabungkannya dalam satu perintah, cara ini biasa disebut sebagai `chaining method`.
Lengkapnya seperti kode berikut:
```bash
const list_students = await Student.find();
  .select('name nim')
  .where({ 'grade': { $gte : 70} })
  .limit(3)
  .sort({ grade: -1 })
  .exec();
console.log(list_students);
```
>**Note:** Untuk mengurutkan data dari yang terbesar hingga ke terkecil digunakan sort descending `-1`.
> Untuk mengurutkan data dari yang terkecil hingga ke terbesar digunakan sort ascending `1`.