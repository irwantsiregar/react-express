const express = require('express');
const app = express();
const port = 3000;

// # Module Router
/* 
ExpressJS memiliki class express.Router yang memungkinkan kita memecah deklarasi routing ke dalam file yang terpisah.
Objek Router sebenarnya merupakan sebuah middleware yang menangani sistem routing.
Sebagai contoh, kita bisa memisah deklarasi routing yang awalnya digabung pada file index.js ke file
tersendiri misal routers.js */

const routers = require('./routers');
app.use(routers);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));