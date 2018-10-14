
var mongoose = require("mongoose");
var grid = require("gridfs-stream");
var fs = require("fs");

grid.mongo = mongoose.mongo;

mongoose.Promise = global.Promise;

var conn = mongoose.connect("mongodb://localhost:27017/menagerie", {useMongoClient: true});

conn.on("error", function(err){
	console.log(err.code, err.message);
});

conn.once("open", function(){
	console.log("CONNECTED to DB");

	var gfs = grid(conn.db);


	             /* WRITING to gridfs */

  //   var writestream = gfs.createWriteStream({filename: "rakshit_MONGO.jpg"});   // FILENAME as to store in DB
  //   fs.createReadStream("C:\\Users\\ra20024024\\Desktop\\Rakshit_docs\\rakshit new photo.jpg").pipe(writestream);

  //   writestream.on("close", function(file){
  //   	 console.log(file.filename, "Written to MONGOdb");

  //   	 conn.db.close(function(){
  // 	    console.log("CONNECTION closed");
  //      });
  //   });


               /* CHECKING on file */

      gfs.exist({filename :"rakshi_MONGO.jpg"}, function(err, found){
          if(err){
            console.log(err.code, err.message);
          }
          else{
            found ? console.log("FILE found") : console.log("FILE not FOUND");
          }

          conn.db.close(function(){
            console.log("CONNECTION closed");
          });
      });
    


    		  /* READING from MONGOdb GRIDfs */

    // var fs_write_stream = fs.createWriteStream("rakshit_from_MONGO.jpg");      // FILENAME as to store in MACHINE
    // gfs.createReadStream({filename: "rakshit_MONGO.jpg"}).pipe(fs_write_stream);

    // fs_write_stream.on("close", function(){
    // 	 console.log("Written to MACHINE");

    // 	 conn.db.close(function(){
    // 		console.log("CONNECTION closed");
    // 	  });
    // });


    		/* DELETE from MONGO GRIDfs*/

    // gfs.remove({filename: "rakshit_MONGO.jpg"}, function(err, gridStore){
    // 	if(err) console.log(err.code, err.message);
    // 	else console.log("FILE deleted");

    // 	conn.db.close(function(){
    // 		console.log("CONNECTION closed");
    // 	});
    // });

});

