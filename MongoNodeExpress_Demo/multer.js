var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var Readable = require('stream').Readable;
var Grid = require('gridfs-stream');
var GridFsStorage = require('multer-gridfs-storage');

var trackRoute = express.Router();
var app = express();
app.use(bodyParser.json());
app.use('/tracks', trackRoute);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mydb');
var conn = mongoose.connection;
conn.once('open', function () {
    console.log('Connected to DB.');
});
Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);

var storage = GridFsStorage({
    url: 'mongodb://localhost:27017/mydb',
    gfs: gfs,
    file: function (req, file) {
        return { filename: req.body.name};
    }
});

//multer settings for single upload
var upload = multer({
    storage: storage
}).single('track');

// default GET /
trackRoute.get('/', function (req, res) {
    res.send('App is ok!');
});

// POST /tracks
trackRoute.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ message: 'Upload Request Validation Failed' });
        } else if (!req.body.name) {
            return res.status(400).json({ message: 'No track name in request body' });
        }
        var trackName = req.body.name;
        // Covert buffer to Readable Stream
        var readableTrackStream = new Readable();
        readableTrackStream.push(req.file.buffer);
        readableTrackStream.push(null);

        var writestream = gfs.createWriteStream({ filename: trackName });
        var id = writestream.id;
        readableTrackStream.pipe(writestream);

        writestream.on('error', function () {
            return res.status(500).json({ message: 'Error uploading file' });
        })
        .on('finish', function () {
            return res.status(201).json({ message: 'File uploaded successfully, stored under Mongo ObjectID: ' + id });
        });
    });
});

// GET /tracks/:trackID
trackRoute.get('/:trackName', function (req, res) {
    var trackName = req.params.trackName;
    res.set('content-type', 'audio/mp3');
    res.set('accept-ranges', 'bytes');
    var readstream = gfs.createReadStream({ filename: trackName });
    readstream.on('data', function (chunk) {
        res.write(chunk);
    })
    .on('error', function () {
        res.status(404).json({ message: 'Track not found' });
    })
    .on('end', function () {
        res.end();
    });
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});
