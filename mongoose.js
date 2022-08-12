const mongoose = require('mongoose');
// membuat koneksi ke mongoDB
mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true, });

// membuat schema untuk collection quotes
const quoteSchema = new mongoose.Schema({
  word: String,
});

// membuat model untuk schema quote
const Quote = mongoose.model('Quote', quoteSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  // membuat quote baru
  const quote = new Quote({ word: 'Besar pasak dari pada tiang' });

  // menyimpan quote
  quote.save((error, quote) => {
    if (error) return console.log(error);
    console.log(quote);
  });
});