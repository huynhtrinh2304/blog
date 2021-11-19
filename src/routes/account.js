const express = require('express');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: './src/public/uploads/' });


const accountController = require('../app/controllers/AccountController');
const logoutMiddleware = require('../app/middlewares/logoutMidderware');
const backMiddleware = require('../app/middlewares/backMiddlerware');


//render view register
router.get('/register', backMiddleware.checkCokkie, accountController.formRegister);

router.post('/register', upload.single('avatar'), accountController.register);





//render view login
router.get('/login', backMiddleware.checkCokkie, accountController.formLogin);

router.post('/login', accountController.login);





router.get('/removeCokkie', logoutMiddleware.requireLogout);


























module.exports = router;