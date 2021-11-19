const Course = require('../models/Course');
const Account = require('../models/Account');

const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');

class AdminController {


    admin(req, res, next) {
        Account.find({})
        res.render('homeAdmin', { layout: 'admin.hbs' })

    }



    manageCourses(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('manage/manageCourses', {
                    layout: 'admin.hbs',
                    courses: mutipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    manageUsers(req, res, next) {
        Account.find({})
            .then((accounts) => {

                res.render('manage/manageUsers', {
                    layout: 'admin.hbs',
                    accounts: mutipleMongooseToObject(accounts),

                })
            })
            .catch(next);
    }





    elementDeleted(req, res, next) {

        Account.findDeleted({})
            .then((accounts) => {
                Course.findDeleted({})
                    .then(courses => {
                        res.render('elementDeleted/elementDeleted', {
                            layout: 'admin.hbs',
                            accounts: mutipleMongooseToObject(accounts),
                            courses: mutipleMongooseToObject(courses),


                        })
                    })
            })
            .catch(next);


    }





    viewEditCourse(req, res, next) {
        Course.findById(req.params.id)
            .then((course) => {
                res.render('edit/editCourse', {
                    layout: 'admin.hbs',
                    course: mongooseToObject(course),

                })
            })
            .catch(next)
    }


    viewEditUser(req, res, next) {
        Account.findById(req.params.id)
            .then((account) => {
                res.render('edit/editUser', {
                    layout: 'admin.hbs',
                    account: mongooseToObject(account),

                })
            })
            .catch(next)
    }





    updateCourse(req, res, next) {
        // Đối số thứ 2 là object cần chỉnh sửa
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/courses'))
            .catch(next)
    }



    updateUser(req, res, next) {
        // Đối số thứ 2 là object cần chỉnh sửa
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/users'))
            .catch(next)


    }


    //Delete soft
    deleteCourse(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/courses'))
            .catch(next)
    }

    //Delete soft
    deleteUser(req, res, next) {
        Account.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/users'))
            .catch(next)
    }


    //Delete forever db 

    deleteAccountForever(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/element-deleted'))
            .catch(next)
    }



    deleteCourseForever(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/admin/element-deleted'))
            .catch(next)
    }





    //Restore User
    restoreUser(req, res, next) {
        Account.restore({ _id: req.params.id })
            .then(() => res.redirect('/admin/users'))
            .catch(next)
    }

    //Restore Course
    restoreCourse(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('/admin/courses'))
            .catch(next)
    }




    createCourse(req, res, next) {
        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`
        const course = new Course(req.body);
        course.save().then(() => res.redirect('back'));

    }


    createUser(req, res, next) {
        req.body.who = 'user';
        const user = new Account(req.body);
        user.save().then(() => res.redirect('back'));

    }







}

module.exports = new AdminController();