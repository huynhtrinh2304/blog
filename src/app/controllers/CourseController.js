const Course = require('../models/Course');
const Account = require('../models/Account');



const { mongooseToObject } = require('../../util/mongoose');

class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                Account.findOne({ fullname: req.cookies.fullname })
                    .then((account) => {
                        res.render('courses/show', {
                            course: mongooseToObject(course),
                            account: mongooseToObject(account),
                        });
                    })
            })

        .catch(next);
    }


    //[GET] /course/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[GET] /course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObject(course),
                }),
            )

        .catch(next);
    }

    //[POST] /course/store
    store(req, res, next) {
        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save().then(() => res.redirect('/me/stored/courses'));
    }

    //[PUT] /course/:id
    update(req, res, next) {
        req.body.img = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE] /course/:id
    delete(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[DELETE] /course/:id/force
    deleteForce(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST] /course/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;
        }
    }

    //[POST] /courses/handle-action-form-trash
    handleActionFormTrash(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.deleteMany({ _id: req.body.courseIds })
                    .then(() => res.redirect('back'))
                    .catch(next);

                break;

            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
        }
    }
}

module.exports = new CourseController();