// this example demostrates RESTful API using express app with SIMPLE Schema
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

var userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String,
});

var User = mongoose.model('user', userSchema);
// Make the User model accessible to the router 
app.use(function (req, res, next) {
    req.User = User;
    next();
});

// common way to create user 
// app.post('/users', function (req, res) {
//     req.User.create(req.body, function (err, user) {
//         if (err)
//             res.send(err);
//         else {
//             console.log(user);
//             res.json(user);
//         }
//     });
// });

// another way to create user
app.post('/users', function (req, res) {
    var newUser = new req.User();
    newUser.name = req.body.name;
    newUser.age = parseInt(req.body.age);
    newUser.email = req.body.email;

    newUser.save(function (err, user) {
        if (err)
            res.send(err);
        else {
            console.log(user);
            res.json(user);
        }
    });
});

app.get('/users', function (req, res) {
    console.log('getting all users... ');
    req.User.find({}, function (err, users) {
        if (err)
            res.send(err);
        else {
            console.log(users);
            res.json(users);
        }
    });
});

app.get('/users/:id', function (req, res) {
    console.log('gettting user by _id... ');
    req.User.findOne({ _id: req.params.id }, function (err, user) {
        if (err)
            res.send(err);
        else {
            console.log(user);
            res.json(user);
        }
    });
});

app.put('/users/:id', function (req, res) {
    console.log('updating user by _id... ');
    req.User.findOneAndUpdate({ _id: req.params.id },
        { $set: { name: req.body.name, age: parseInt(req.body.age), email: req.body.email } },
        { new: true },
        function (err, user) {
            if (err)
                res.send(err);
            else {
                console.log(user);
                res.json(user);
            }
        });
});

app.delete('/users/:id', function (req, res) {
    console.log('deleting user by _id... ');
    req.User.findOneAndRemove({ _id: req.params.id }, function (err, user) {
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