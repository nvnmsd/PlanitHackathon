const dbConnect = require('./mongodb');
const url = "mongodb+srv://planithackathon:VarNitNav@cluster0.pxlimgy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const databaseName = 'myFirstDatabase';
const client = new MongoClient(url);

async function insert() {
    let db = await dbConnect();
    // let result = result.db(databaseName);
    // return db.collection('resource');
    let result = await db.insertOne();
    if( result.acknowledged ) {
        
    }
}

module.exports = insert;