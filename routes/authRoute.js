const express = require('express')
const router= new express.Router()

const authController = require('../controllers/authController');

router.post("/signup", authController.signup);


module.exports = router;