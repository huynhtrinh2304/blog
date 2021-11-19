const express = require('express');
const router = express.Router();


const adminController = require('../app/controllers/AdminController');



router.get('/courses', adminController.manageCourses);

router.get('/users', adminController.manageUsers);

router.get('/element-deleted', adminController.elementDeleted);

router.get('/', adminController.admin);


//Update Course
router.get('/:id/edit-courses', adminController.viewEditCourse);
router.put('/:id/course', adminController.updateCourse);


//Update User
router.get('/:id/edit-user', adminController.viewEditUser);
router.put('/:id/user', adminController.updateUser);


//Delete Soft Course / User
router.delete('/:id/delete-course', adminController.deleteCourse);
router.delete('/:id/delete-user', adminController.deleteUser);


//Permanently deleted Course / User 
router.delete('/:id/delete-over-user', adminController.deleteAccountForever);
router.delete('/:id/delete-over-course', adminController.deleteCourseForever);



//Restore Course / User
router.patch('/:id/restore-user', adminController.restoreUser);
router.patch('/:id/restore-course', adminController.restoreCourse);



//Create Course / User
router.post('/create-course', adminController.createCourse);
router.post('/create-user', adminController.createUser);






module.exports = router;