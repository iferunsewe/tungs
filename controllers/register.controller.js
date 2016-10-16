var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function (req, res) {
    console.log("INSIDE GET REQUEST REG CONTROLLER");
    res.render('register');
});

router.post('/', function (req, res) {
    console.log("INSIDE POST REQUEST REG CONTROLLER");
    // register using api to maintain clean separation between layers
    request.post({
        url: "http://localhost:" + process.env.TUNGS_PORT + "/api/users/authenticate",
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('register', { error: 'An error occurred' });
        }

        if (response.statusCode !== 200) {
            return res.render('register', {
                error: response.body,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        }

        // return to login page with success message
        req.session.success = 'Registration successful';
        return res.redirect('/login');
    });
});

module.exports = router;