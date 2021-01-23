 
// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/karryngo";
 
// create a client to mongodb
var mongo = require('mongodb');
 
// make client connect to mongo service
var db = MongoClient.connect(url)
    console.log("Switched to "+db.databaseName+" database");