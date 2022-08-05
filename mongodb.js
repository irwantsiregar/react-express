const MongoClient = require("mongodb").MongoClient;
const connectionString = "mongodb://localhost:27017";

// Melakukan koneksi dengan fungsi callback pada method connect.
MongoClient.connect(connectionString, { useUnifiedTopology: true },
  (error, client) => {
    if (error) return console.error(error);
    console.log("Server database connect!");
  });


// Melakukan koneksi dengan metode Promise.
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log("Server database connect!");
  })
  .catch(error => console.error(error));


// Melakukan koneksi dengan metode async await.
(async () => {
  try {
    const client = await MongoClient.connect(connectionString, { useUnifiedTopology: true });
    console.log("Server database connect!");
  } catch (error) {
    console.error(error);
  }
})();
