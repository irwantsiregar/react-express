# Build API Foodstore with framework Express JS

## Study Cases Express | Products

## API Endpoint
| Entitas | Method | Route | Description |
  --------------------------------------
| Product | GET    | /products/ | Get list Products
|         | POST   | /products | Create a new Product
|         | PUT    | /products/:id | Update Product by parameters id
|         | DELETE | /products/:id | Delete Product by parameters id


### Prepare Environment and Configuration begin
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

Generate New Aplications wirh syntaks:
```bash
$ express --view=pug foodstore-server
```
