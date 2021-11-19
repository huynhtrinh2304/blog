module.exports.authentication = function(req, res, next) {

    if (req.cookies.who === 'user') {
        res.redirect('/');
        return;
    }


    next();
}