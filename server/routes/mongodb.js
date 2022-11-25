const {MongoClient} = require('mongodb');
const url = "mongodb+srv://planithackathon:VarNitNav@cluster0.pxlimgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const databaseName = 'myFirstDatabase';
const client = new MongoClient(url);

async function dbConnect() {
    let result = await client.connect();
    let db = result.db(databaseName);
    return db.collection('resource');
}

module.exports = dbConnect;