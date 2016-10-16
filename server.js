var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;
var session = require('express-session');

var USERS_COLLECTION = "users";

var app = express();

app.set('views', path.join(__dirname, 'app'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: process.env.TUNGS_SECRET, resave: false, saveUninitialized: true }));
// routes
app.use('/login', require('./controllers/login.controller'));
app.use('/register', require('./controllers/register.controller'));
app.use('/app', require('./controllers/app.contoller.js'));
app.use('/api/users', require('./controllers/api/users.contoller.js'));

// use JWT auth to secure the api
//app.use('/api', expressJwt({ secret: config.secret }).unless({ path: ['/api/users/authenticate', '/api/users/register'] }));

// make '/app' default route
app.get('/', function (req, res) {
    console.log("INSIDE GET REQUEST SERVER CONTROLLER");
    return res.redirect('/app');
});

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = database;
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
        var port = server.address().port;
        console.log("App now running on port", port);
    });
});

// USERS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({"error": message});
}

/*  "/users"
 *    GET: finds all users
 *    POST: creates a new user
 */

app.get("/users", function(req, res) {
    db.collection(USERS_COLLECTION).find({}).toArray(function(err, docs) {
        if (err) {
            handleError(res, err.message, "Failed to get users.");
        } else {
            res.status(200).json(docs);
        }
    });
});

app.post("/users", function(req, res) {
    var newUser = req.body;
    newUser.createDate = new Date();

    if (!(req.body.firstName || req.body.lastName)) {
        handleError(res, "Invalid user input", "Must provide a first or last name.", 400);
    }

    db.collection(USERS_COLLECTION).insertOne(newUser, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to create new user.");
        } else {
            res.status(201).json(doc.ops[0]);
        }
    });
});

/*  "/users/:id"
 *    GET: find user by id
 *    PUT: update user by id
 *    DELETE: deletes user by id
 */

app.get("/users/:id", function(req, res) {
    db.collection(USERS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to get user");
        } else {
            res.status(200).json(doc);
        }
    });
});

app.put("/users/:id", function(req, res) {
    var updateDoc = req.body;
    delete updateDoc._id;

    db.collection(USERS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
        if (err) {
            handleError(res, err.message, "Failed to update user");
        } else {
            res.status(204).end();
        }
    });
});

app.delete("/users/:id", function(req, res) {
    db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
        if (err) {
            handleError(res, err.message, "Failed to delete user");
        } else {
            res.status(204).end();
        }
    });
});