const express = require('express');
const router = express.Router();




const categoryController = require('../app/controllers/CategoryController');



//render view
router.get('/action', categoryController.action);






module.exports = router;