# 📚👨‍💻Build API with framework Express JS
`MongoDB` `Express` `NodeJS`
## Case Study Foodstore Server | Products

## API Endpoint
| Entitas | Method | Route | Description |
| ------- |------- | ----- | ----------- |
| Product | GET    | /products | Get list Products | 
|         | POST   | /products | Create a new Product |
|         | PUT    | /products/:id | Update Product by parameters id |
|         | DELETE | /products/:id | Delete Product by parameters id |
| Category | POST   | /categories | Create a new Category |
|         | PUT    | /categories/:id | Update Category by parameters id |
|         | DELETE | /categories/:id | Delete Category by parameters id |
| Tags    | POST   | /tags | Create a new Category |
|         | PUT    | /tags/:id | Update Category by parameters id |
|         | DELETE | /tags/:id | Delete Category by parameters id |



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
