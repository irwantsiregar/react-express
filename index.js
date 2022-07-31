const express = require('express');
const app = express();
const port = 3000;

// # Regular Expression Pada Routing

/* Salah satu kelebihan dari routing di ExpressJS adalah mendukung regular expression (regex) pada route.
Misalnya expresi * digunakan untuk merepresentasikan karakter apapun. 
Contoh: */
app.get('/page-*', (req, res) => {
  res.send('Route: ' + req.path);
});

/* 
Routing di atas akan cocok untuk semua routing dengan method GET yang diawali dengan path /page-.
Jadi misalnya ketika ada requuest /page-apapun maka akan menampilkan respon: route: /page-apapun

Contoh lain:
- /xy?z akan match dengan /xyz & /xz (tanda tanya artinya karakter sebelumnya boleh ada boleh tidak atau opsional).
- Jika karakter opsional lebih dari satu maka gunakan tanda kurung '/food(s)?' maka akan match dengan routing /food dan /foods
- Kebalikan karakter opsional adalah karakter yang menunjukkan harus ada minimal satu yaitu karakter +, maka routing '/page(s)+' akan match dengan URL /pages, /pagess, dsb (karakter s setelah page minimal satu)
*/
app.get('/xy?z', (req, res) => {
  res.send('Route: ' + req.path);
});
app.get('/food(s)?', (req, res) => {
  res.send('Route: ' + req.path);
});
app.get('/page(s)+', (req, res) => {
  res.send('Route: ' + req.path);
});

// Dengan menggunakan konsep regex tersebut maka dapat digabung dengan konsep dinamis routing, misalnya:
app.get('/post/:id?', (req, res) => {
  res.send('artikel-' + req.params.id)
})

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));