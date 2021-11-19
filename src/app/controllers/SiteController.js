const Course = require('../models/Course');
const Account = require('../models/Account');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');


class SiteController {

    //[GET] /
    home(req, res, next) {
        Course.find({})
            .then((courses) => {
                var indexPage = parseInt(req.query.page) || 1;
                var amountProduct = 3;
                var begin = (indexPage - 1) * amountProduct;
                var end = indexPage * amountProduct;
                var next = indexPage + 1;
                var previous = indexPage - 1;

                if (previous == 0) {
                    var previous = 1;
                }

                Account.findOne({ fullname: req.cookies.fullname })
                    .then((account) => {
                        res.render('home', {
                            courses: mutipleMongooseToObject(courses.slice(begin, end)),
                            account: mongooseToObject(account),
                            next,
                            previous
                        });
                    })


            })
            .catch(next);
    }




}

module.exports = new SiteController();