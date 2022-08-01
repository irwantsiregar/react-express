const express = require('express');
const app = express();
const port = 3000;

// # Middleware ExpressJS

// deklarasi routing
const routers = require('./routers');
app.use(routers);

const path = require('path')
// middleware static
app.use('/public', express.static(path.join(__dirname, 'public')))

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));