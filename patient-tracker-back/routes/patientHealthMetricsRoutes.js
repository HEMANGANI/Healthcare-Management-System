const express = require('express');
const router = express.Router();
const patientHealthMetricsController = require('../controllers/patientHealthMetricsController'); // Adjust the path according to your project structure


router.get('/:patientId', patientHealthMetricsController.getPatientHealthMetrics);


module.exports = router;