var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function (req, res) {
    // If no user ID exists in the JWT return a 401
    if (!req.payload._id) {
        res.status(401).json({
            "message": "UnthauthorizedError: private profile"
        });
    } else {
        // Otherwise continue
        User
            .findById(req.payload._id)
            .exec(function (err, user) {
                if (err) {
                    res.status(404).json({
                        "message": "No user found using the id" + req.payload._id
                    });
                } else {
                    res.status(200).json(user);
                }
            });
    }
};