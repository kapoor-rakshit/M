
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/menagerie", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log(err.code, err.message);
});

db.once("open", function(){
	console.log("CONNECTED to DB");
});


var schema = mongoose.Schema;
var collectionschema = new mongoose.Schema({
	_id: Number,
    name: String,
    age: Number,
    email: String,
    address: { street: String, city: String, pin: Number },
    phone: [schema.Types.Mixed],
    subjects: Array,
});
var collection = mongoose.model("coll", collectionschema, "stud");


var query = collection.remove({_id: 14109025});
query.exec()
		.then((data) => {
			console.log("DELETED");

			db.close(function(){
				console.log("CONNECTION closed");
			});
		})
		.catch((err) => {
			console.log(err);
		})

