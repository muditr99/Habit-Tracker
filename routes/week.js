const express = require('express');

const router = express.Router();

const weekController = require('../controllers/week_controller');


router.get('/', weekController.show);
router.get('/update/',weekController.update);


module.exports = router;