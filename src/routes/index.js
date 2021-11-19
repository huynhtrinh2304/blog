const siteRouter = require('./site');
const courseRouter = require('./courses');
const myCourseRouter = require('./myCourse');
const accountRouter = require('./account');
const adminRouter = require('./admin');
const categoryRouter = require('./category');




const loginMiddleware = require('../app/middlewares/loginMiddleware');
const authController = require('../app/middlewares/authenMiddlerware');




function route(app) {

    app.use('/handle', accountRouter);
    app.use('/category', categoryRouter);
    app.use('/courses', loginMiddleware.requireLogin, courseRouter);
    app.use('/me', loginMiddleware.requireLogin, myCourseRouter);
    app.use('/admin', authController.authentication, loginMiddleware.requireLogin, adminRouter);
    app.use('/', loginMiddleware.requireLogin, siteRouter);

}

module.exports = route;