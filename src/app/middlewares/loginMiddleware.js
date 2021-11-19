const Account = require('../models/Account');

module.exports.requireLogin = function login(req, res, next) {
    var check = Account.findOne({ who: req.cookies.who })
    if (!req.cookies.who || !check) {
        res.redirect('/handle/login');
        return;

    }

    next();
}