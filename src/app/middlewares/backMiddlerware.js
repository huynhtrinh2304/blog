var url = require('url');
module.exports.checkCokkie = function(req, res, next) {

    if (req.cookies.who) {
        res.redirect('back')
        return;
    }

    next();


}