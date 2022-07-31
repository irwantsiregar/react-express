const express = require('express');
const app = express();
const port = 3000;
// #Mengirim berbagai jenis response, di mana argumennya bisa berisi konten serta mengakhiri proses response.
app.get('/', (req, res) => res.send('Hello World!'));

// #res.write()=>menulis konten ke response. res.end()=>mengakhiri proses response di mana argumennya bisa berisi konten.
app.get('/hello', (req, res) => {
  res.write('Hello ')
  res.write('World!')
  res.end()
});

// HTTP method lainnya
app.post('/contoh', (req, res) => res.send('Request dengan method POST'));
app.put('/contoh', (req, res) => res.send('Request dengan method PUT'));
app.delete('/contoh', (req, res) => res.send('Request dengan method DELETE'));

// #Selain itu kita juga bisa mendefinisikan route yang sama untuk semua method yaitu dengan mengubahnya menjadi all()
app.all('/universal', function (req, res) {
  res.send('request dengan method ' + req.method)
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));