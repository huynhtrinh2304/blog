const Account = require('../models/Account');





class AccountController {

    formRegister(req, res) {
        res.render('formHandle/formRegister', { layout: 'form.hbs' });
    }

    formLogin(req, res) {
        res.render('formHandle/formLogin', { layout: 'form.hbs' });
    }


    register(req, res, next) {

        Account.findOne({ username: req.body.username })
            .then((accounts) => {

                if (accounts !== null) {
                    res.render('formHandle/formRegister', { layout: 'form.hbs', error: 'Tai Khoan Ton tai' });

                } else {

                    req.body.avatar = '\\' + req.file.path.split('\\').slice(2).join('\\');
                    req.body.who = 'user';
                    const account = new Account(req.body);
                    account.save().then(() => res.redirect('/handle/login'));

                }
            })
            .catch(next)

    }

    login(req, res, next) {
        var user = req.body.username;
        var pass = req.body.password;




        Account.findOne({ username: user, password: pass })
            .then((acc) => {
                if (acc !== null) {

                    res.cookie('who', acc.who, { maxAge: 6000000 });
                    res.cookie('fullname', acc.fullname, { maxAge: 6000000 });
                    if (acc.who == 'admin') {
                        res.redirect('/admin');
                        return;
                    }

                    if (acc.who == 'user') {
                        res.redirect('/');
                        return;
                    }


                }
                if (acc === null) {

                    res.render('formHandle/formLogin', { layout: 'form.hbs', error: 'ten dang nhap khong chinh xac' });
                    return;

                }
            })
            .catch(next);


    }


}




module.exports = new AccountController();