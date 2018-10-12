
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/menagerie", {useMongoClient: true});

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
		address: {street: String, city: String, pin: Number},
		phone: [schema.Types.Mixed],
		subjects: Array,
	});

var collection = mongoose.model("coll", collectionschema, "stud");

var telno = "18567";
collection.update(
		{_id: 14109025},

		{
			$set: {name: "kapoorrakshit", "address.street": "163-A", "address.city": "ATQ", email: "rakshit.kapoor@wipro.com"},
			$inc: {age: 2},
			$addToSet: {subjects: {$each: ["DJANGO", "FLASK", "BASH"]}},
			$push: {phone: {home: telno}}

		},

		{multi: true},

		function(err){
			if(err) console.log(err.code, err.message);
			else console.log("DATA UPDATED");

			db.close(function(){
				console.log("CONNECTION closed");
			});
		}
	);

