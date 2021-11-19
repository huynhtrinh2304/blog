const Course = require('../models/Course');
const Account = require('../models/Account');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');




class CategoryController {

    //[GET] /courses/:slug
    action(req, res, next) {

        //Page
        var indexPage = parseInt(req.query.page) || 1;
        var amountProduct = 3;
        var begin = (indexPage - 1) * amountProduct;
        var end = indexPage * amountProduct;
        var next = indexPage + 1;
        var previous = indexPage - 1;

        if (previous == 0) {
            var previous = 1;
        }


        var category = req.originalUrl.split('/').slice(2).join('');
        Course.find({ category: category })
            .then((courses) => {
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

module.exports = new CategoryController();