
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/menagerie", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Connection Error", err);
});

db.once("open", function(){
	console.log("Connected to DB");
});


var schema = mongoose.Schema;
var collectionSchema = new mongoose.Schema({                                      // SCHEMA created
								_id: Number,
								name: String,
								age: Number,
								email: String,
								address: {street: String, city: String, pin: Number},
								phone: [schema.Types.Mixed],
								subjects: Array,
							});

var collection = mongoose.model("coll", collectionSchema, "stud");                 // COLLECTION "stud" created
              // "coll" is ModelName, in absensce of CollectionName, collection is created with name ModelNames ie s appended to modelname


var newdocument = new collection({                                                 // DOCUMENT created
	_id: 20141014,
	name: "adhish-kapoor",
	age: 0,
	email: "adhish.kapoor@yahoo.co.in",
	address: {street: "SHASTRI NAGAR", pin: 143001, city: "ATQ"},
	phone: {office: 9410000, home: 9876543},
	subjects: ["DS", "OS", "FLASK"]
});

newdocument.save(function(err, data){                                             // DOCUMENT saved to COLLECTION
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

