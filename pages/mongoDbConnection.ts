const MongoClient = require('mongodb').MongoClient;
let cachedDb: any = null;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('👌 Using existing connection');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(process.env.DB, {
    native_parser: true,
    useUnifiedTopology: true
  })
    .then((client) => {
      let db = client.db('dbname');
      console.log('🔥 New DB Connection');
      cachedDb = db;
      return cachedDb;
    })
    .catch((error) => {
      console.log('Mongo connect Error');
      console.log(error);
    });
};
