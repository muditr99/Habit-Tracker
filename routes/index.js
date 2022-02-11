const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller');


router.get('/', homeController.home);

router.post('/create-habit', homeController.create);
router.get('/delete-habit', homeController.delete);

router.use('/weekView', require('./week'));



module.exports = router;