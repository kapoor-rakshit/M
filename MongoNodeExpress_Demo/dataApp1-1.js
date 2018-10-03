// working with node and mongoose 
// this example demonstrates CRUD operations from server-side to DB

var mongoose = require('mongoose');
var util = require('util'); // optional, just formatting / pretty print JSON string

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', function (err) {
    console.log('Connection error', err);
});
db.once('open', function () {
    console.log('Connected to DB.');
});
// db.close(function () {
//     console.log('Connection closed.');
// });

// var myCollSchema = new mongoose.Schema({ x: Number }); // simple schema
// var coll = mongoose.model('coll', myCollSchema, 'myCollection');

// defining schema with collection name
// var myCollSchema = new mongoose.Schema({ x: Number }, { collection: 'myCollection' });
// alternate syntax to define model
// var coll = db.model('coll', myCollSchema);

// when callback function is passed, the operation will be executed immediately
// coll.find({}, function (err, data) {
//     if (err) return console.log(err);
//     else {
//         // console.log(data);
//         data.forEach(function (doc) {
//             console.log('x = ' + doc.x);
//         });
//     }
//     db.close(function () {
//         console.log('Connection closed.');
//     });
// });

// using Promise style query
// when callback funciton is NOT passed, an instance of Query is returned
// var query = coll.find({});
// query.select({_id:0, x:1}); // using projection
// query.exec()
//     .then((data) => {
//         console.log(data);
//         db.close(function () {
//             console.log('Connection closed.');
//         });
//     })
//     .catch((err) => {
//         console.log(err);
//     })






// ================================================================================ //
// ============================COMPLEX-Schema====================================== //
var Schema = mongoose.Schema;
var userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
    address: { street: String, city: String, state: String },
    phone: [Schema.Types.Mixed],
    likes: Array,
});

var User = mongoose.model('user', userSchema);

// var newUser1 = new User({
//     name: "Scott",
//     age: 25,
//     email: "scott@test.com",
//     address: { street: '1 Jefferson St', city: 'NYC', state: 'NY' },
//     phone: { office: 12345678 },
//     likes: ['movies']
// });

// ============================CREATE-Operation====================================== //
// newUser1.save(function (err, user) {
//     if (err)
//         return console.log(err);
//     else
//         console.log(user);

//     db.close(function () {
//         console.log('Connection closed.');
//     });
// });

// ============================READ-Operation====================================== //
// User.find({ name: 'Scott' }, function (err, user) {
//     if (err)
//         return console.log(err);
//     else {
//         // console.log(JSON.stringify(user));
//         console.log(util.inspect(user, { depth: null, colors: true })); // just to pretty print JSON 
//     }
//     db.close(function () {
//         console.log('Connection closed.');
//     });
// });


// ============================UPDATE-Operation====================================== //
// simple update
User.update({ name: "Scott" }, { $set: { age: 35 } }, function (err) {
    if (err)
        return console.log(err);
    else
        console.log('Data updated...');

    db.close(function () {
        console.log('Connection closed.');
    });
});




// using multiple update operators together
// User.update({ name: 'Scott' },
//     {
//         $set: { 'address.city': 'Dallas', 'address.state': 'TX' },
//         $inc: { age: 5 },
//         $push: { phone: { 'personal': 12312312 } },
//         $addToSet: { likes: { $each: ['running', 'movies', 'shopping'] } }
//     },
//     { multi: true },
//     function (err) {
//         if (err) return console.log(err);
//         else console.log('Data updated...');
//         db.close(function () {
//             console.log('Connection closed.');
//         });
//     });

// ============================DELETE-Operation====================================== //
// User.remove({name:"Scott"}, function (err) {
//     if (err)
//         return console.log(err);
//     else
//         console.log('Data deleted...');

//     db.close(function() {
//         console.log('Connection closed.');
//     });
// });

// ============================END-OF-EXAMPLE====================================== //
// ================================================================================ //