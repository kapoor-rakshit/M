
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost:27017/menagerie", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log(err.code, err.message);
});

db.once("open", function(){
	console.log("Connected to DB");
});


var schema = mongoose.Schema;
var collectionSchema = new mongoose.Schema({
								_id: Number,
								name: String,
    							age: Number,
    							email: String,
    							address: { street: String, city: String, pin: Number},
    							phone: [schema.Types.Mixed],
    							subjects: Array,
							});
var collection = mongoose.model("coll", collectionSchema, "stud");



                                                  /* USING CALLBACK */
                                                 // when callback function is passed, the operation will be executed immediately
collection.find({}, function(err, data){
	if(err){
		console.log(err.code, err.message);
	}
	else{
		console.log("USING CALLBACK FUNC");
										   // lOOP list of response
		data.forEach(function(document){
			console.log("ID:", document._id,
						"NAME:", document.name,
						"AGE:", document.age,
						"EMAIL:", document.email,
						"ADDRESS:", document.address,
						"PHONE:", document.phone,
						"SUBJECTS:", document.subjects
						);
		});
	}

	db.close(function(){
		console.log("Connection Closed");
	});

});


                                                  /* USING PROMISE */
                                                  // when callback function not passed, an instance of QUERY is returned.
var query = collection.find({});
query.select({__v: false});         // PROJECTION
query.exec()
		.then((data) => {
			console.log("USING PROMISE");
			console.log(data);
			
			console.log(data[1].address.street);
			console.log(data[1].phone[0].home);
			console.log(data[1].subjects[2]);

			db.close(function(){
				console.log("Connection closed");
			});
		})
		.catch((err) => {
			console.log(err);
		})

