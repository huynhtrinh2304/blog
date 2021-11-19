const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MyCourseController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([
                    Course.find({}),
                    Course.countDocumentsDeleted()
                ]


            )
            .then(([courses, countDelete]) =>
                res.render('myCourse/storedCourses', {
                    courses: mutipleMongooseToObject(courses),

                    countDelete,
                }),
            )
            .catch((err) => {});
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('myCourse/trashCourses', {
                    courses: mutipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MyCourseController();