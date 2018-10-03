// this example demostrates RESTful API using express app with COMPLEX Schema
// it can send and receive JSON data from server-side

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb', { useMongoClient: true });

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

// example client request format JSON string...
// [{"key":"name","value":"John"},{"key":"age","value":"35"},{"key":"email","value":"john@test.com"},{"key":"address.street","value":"1st Main Rd"},{"key":"address.city","value":"NYC"},{"key":"address.state","value":"NY"},{"key":"phone[][office]","value":"12312312"},{"key":"likes","value":"shopping"}]

app.post('/users', function (req, res) {
    User.create(req.body, function (err, user) {
        if (err)
            res.send(err);
        else {
            console.log(user);
            res.json(user);
        }
    });
});

app.get('/users', function (req, res) {
    console.log('getting all books... ');
    User.find({}, function (err, users) {
        if (err)
            res.send(err);
        else {
            console.log(users);
            res.json(users);
        }
    });
});

app.get('/users/:name', function (req, res) {
    console.log('gettting user by name... ');
    User.findOne({ name: req.params.name }, function (err, user) {
        if (err)
            res.send(err);
        else {
            console.log(user);
            res.json(user);
        }
    });
});

app.listen(3000, function () {
    console.log('Server app listening on port 3000');
});