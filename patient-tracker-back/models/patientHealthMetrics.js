const mongoose = require('mongoose');


const Schema = mongoose.Schema;


// Define the blood pressure schema
const BloodPressureSchema = new Schema({
   systolic: { type: Number, required: true },
   diastolic: { type: Number, required: true }
});


// Define the health metrics schema
const HealthMetricSchema = new Schema({
   date: { type: Date, required: true },
   bloodPressure: BloodPressureSchema,
   weight: { type: Number, required: true },
   bloodSugar: { type: Number, required: true }
});


// Define the main patient health metrics schema
const PatientHealthMetricsSchema = new Schema({
   patientId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Patient' },
   healthMetrics: [HealthMetricSchema]
});


// Create the model from the schema
const PatientHealthMetrics = mongoose.model('PatientHealthMetrics', PatientHealthMetricsSchema);


module.exports = PatientHealthMetrics;