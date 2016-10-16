var express = require('express');
var router = express.Router();
var request = require('request');

const loginHtml = '../app/login/login.component.html';

router.get('/', function (req, res) {
    console.log("INSIDE GET REQUEST LOGIN CONTROLLER");
     //log user out
    delete req.session.token;

    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.render(loginHtml, viewData);
});

router.post('/', function (req, res) {
    console.log("INSIDE POST REQUEST REG CONTROLLER");
    // authenticate using api to maintain clean separation between layers
    request.post({
        url: "http://localhost:" + process.env.TUNGS_PORT + "/api/users/authenticate",
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            return res.render('login', { error: 'An error occurred' });
        }

        if (!body.token) {
            return res.render('login', { error: body, email: req.body.email });
        }

        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;

        // redirect to returnUrl
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
        res.redirect(returnUrl);
    });
});

module.exports = router;