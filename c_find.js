
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/manage", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log(err.code, err.message);
});

db.once("open", function(){
	console.log("Connected to DB");
});


var collectionSchema = new mongoose.Schema({_id: Number, name: String, roll: Number});
var collection = mongoose.model("coll", collectionSchema, "stud");

                                                  /* USING CALLBACK */
collection.find({}, function(err, data){
	if(err){
		console.log(err.code, err.message);
	}
	else{
		console.log("USING CALLBACK FUNC");
												// loop list of response
		data.forEach(function(document){
			console.log("ID:", document._id, "ROLL:", document.roll, "NAME:", document.name);
		});
	}

	db.close(function(){
		console.log("Connection Closed");
	});

});


                                                  /* USING PROMISE */
                                                  // when callback function not passed, an instance of QUERY is returned.
var query = collection.find({});
query.select({__v: false});
query.exec()
		.then((data) => {
			console.log("USING PROMISE");
			console.log(data);
			console.log(data[1]._id)
			db.close(function(){
				console.log("Connection closed");
			});
		})
		.catch((err) => {
			console.log(err);
		})

