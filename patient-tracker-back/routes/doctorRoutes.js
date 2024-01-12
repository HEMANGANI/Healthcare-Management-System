const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const { verifyToken } = require('../jwt-middleware');




router.post('/register', doctorController.registerDoctor);
router.post('/login', doctorController.loginDoctor);
router.get('/patients/:doctorId', verifyToken, doctorController.getPatientDetailsForDoctor);
router.post('/patients/:doctorId', verifyToken, doctorController.addPatientForDoctor);


module.exports = router;