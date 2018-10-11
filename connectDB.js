
var mongoose = require("mongoose");

                                    // native ES6 promises plugged in
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/manage", {useMongoClient: true});

var db = mongoose.connection;

db.on("error", function(err){
	console.log("Connection Error: ", err.code, err.message);
});

db.once("open", function(){
	console.log("Connected to DB");
});



db.close(function(){
	console.log("Connection Closed");
});