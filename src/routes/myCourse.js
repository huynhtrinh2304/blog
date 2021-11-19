const express = require('express');
const router = express.Router();

const myCourseController = require('../app/controllers/MyCourseController');

router.get('/stored/courses', myCourseController.storedCourses);
router.get('/trash/courses', myCourseController.trashCourses);

module.exports = router;