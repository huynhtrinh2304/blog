module.exports.requireLogout = function(req, res, next) {
    if (req.cookies.who) {
        res.clearCookie('who');
        res.clearCookie('fullname');
        res.redirect('/handle/login');
        return;

    }
    next();
}