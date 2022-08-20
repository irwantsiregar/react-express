# 📚👨‍💻Build RESTful API Using Framework Express.js
`MongoDB` `Express` `NodeJS`
## Case Study foodstore-server | Products

## API Endpoint
 path`/api/`
| Entity | Method | Route | Description |
| ------- |------- | ----- | ----------- |
| Product | GET    | /products | Get list Products | 
|         | POST   | /products | Create a new Product |
|         | PUT    | /products/:id | Update Product by parameters id |
|         | DELETE | /products/:id | Delete Product by parameters id |
| Category | POST   | /categories | Create a new Category |
|         | PUT    | /categories/:id | Update Category by parameters id |
|         | DELETE | /categories/:id | Delete Category by parameters id |
| Tags    | GET    | /tags | Get list tags | 
|         | POST   | /tags | Create a new Category |
|         | PUT    | /tags/:id | Update Category by parameters id |
|         | DELETE | /tags/:id | Delete Category by parameters id |
| Region | GET | /wilayah/provinsi | Get list districts | 
|       | GET | /wilayah/kabupaten | Get list provincies | 
|       | GET | /wilayah/kecamatan | Get list regencies | 
|       | GET | /wilayah/desa | Get list villages | 
| DeliveryAddress | GET    | /delivery-addresses | Get list Delivery-Address | 
|         | POST   | /delivery-addresses | Create a new Delivery-Address |
|         | PUT    | /delivery-addresses/:id | Update Delivery-Address by parameters id |
|         | DELETE | /delivery-addresses/:id | Delete Delivery-Address by parameters id |

 path`/auth/`
| Entity | Method | Route | Description |
| ------- |------- | ----- | ----------- |
| User | POST    | /register | Create a new user | 
|      | POST    | /login | Login for user | 
|      | GET    | /me | Get user information which login | 
|      | POST    | /logout | Logout for user | 

### Prepare Environment and Initial Configuration
```bash
$ npm install -g express-generator
```
If installation success:
```bash
$ express --version
```

Change directory. Ex: /Desktop/development/
```bash
$ cd /Desktop/development 
```

Generate New Application with syntax:
```bash
$ express --view=pug foodstore-server
```


#### Other additional packages:

NodeJS-based ODM (Object Data Mapping) tools or framework for MongoDB databases.
```bash
$ npm install mongoose --save
```

To be able to read the variables stored in the .env file
```bash
$ npm install dotenv --save
```

So that Express can read data sent using `form-data`
```bash
$ npm install multer --save
```

Hashing Password
```bash
$ npm install bcrypt --save
```

AutoIncrement on Schema
```bash
$ npm install mongoose-sequence --save
```

Generate token using JSON Web Token
```bash
$ npm install jsonwebtoken --save
```

Local strategy: we define our own strategy to login in the app
```bash
$ npm install passport passport-local --save
```

RBAC (Role Based Access Control): each role in the application can be assigned a rule to be able to perform any action (ex: CRUD) against any resource (User, Product)
```bash
$ npm install @casl/ability --save
```

Functions to read CSV format files while converting them to JSON
```bash
$ npm install csvtojson --save
```

---


Kode berikut befungsi untuk kita melakukan pemilihan terhadap field apa saja yang akan dikembalikan dari data di MongoDB
```js
let user = await User.findOne({email}).select('-__v -createdAt -updatedAt -cart_items -token');
```
Artinya kita pilih semua atribut pada User kecuali atribut-atribut yang kita tulis dengan awalan tanda minus '-'. 


Kode Category.findOne kita gunakan untuk mencari data ke _collection Category
```js
let category = await Category.findOne({name: {$regex: payload.category, $options: 'i' }})
```
Kriterianya adalah field name kemudian menggunakan `$regex` dengan `$options` bernilai `i` untuk
incasesensitive atau tidak sensitif case, misalnya "food" atau "Food" akan dianggap sama saja.


Menggunakan find untuk mencari satu atau lebih tag berbeda dengan findOne yang hanya mencari satu data
```js
let tags = await Tag.find({name: {$in: payload.tags}});
```
`$in` artinya mencari data yang sesuai atau match dengan nilai kriteria yang terdapat pada suatu key payload. Misalnya payload.tags bernilai ['juice', 'fresh'], maka Mongoose akan mencari di collection Tag semua data tag yang memiliki nama juice atau fresh. 
