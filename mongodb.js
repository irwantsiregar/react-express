const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

(async () => {
  try {
    const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
    const db = client.db('latihan');

    // Kode query ke collection quotes 
    // Untuk menampilkan seluruh data dokumen yang ada pada collecion
    const quotes = await db.collection('quotes').find().toArray();

    // Untuk menampilkan satu data dokumen quotes
    const quote = await db.collection('quotes').findOne();

    // Untuk menampilkan data dengan kriteria tertentu
    const quoteOne = await db.collection('quotes').find({ word: 'Gitu aja kok repot' }).toArray();

    // Untuk menampilkan data quotes yang ada kata
    const quoteLike = await db.collection('quotes').find({ word: /Gitu/ }).toArray();

    console.log(quotes);
    console.log(quote);
    console.log(quoteOne);
    console.log(quoteLike);
  } catch (error) {
    console.error(error);
  }
})();
