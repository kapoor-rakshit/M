
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/manage", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Connection Error", err);
});

db.once("open", function(){
	console.log("Connected to DB");
});

																	                  // SCHEMA created
var collectionSchema = new mongoose.Schema({_id: Number, roll: Number, name: String});
																					  // COLLECTION created
var collection = mongoose.model("coll", collectionSchema, "stud");


var newcollection = new collection({                                                 // DOCUMENT created
	_id: 3,
	name: "kapoor",
	roll: 14109025,
});

newcollection.save(function(err, data){                                             // DOCUMENT saved to COLLECTION
	if(err){
		console.log(err.code, err.message);
	}
	else{
		console.log(data);
	}

	db.close(function(){
		console.log("Connection closed");
	});

});

