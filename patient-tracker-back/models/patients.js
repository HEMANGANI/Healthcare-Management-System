const mongoose = require('mongoose');


const emergencyContactSchema = new mongoose.Schema({
   name: String,
   relationship: String,
   contact: String
});


const insuranceSchema = new mongoose.Schema({
   provider: String,
   policyNumber: String
});


const medicalHistorySchema = new mongoose.Schema({
   allergies: [String],
   chronicConditions: [String],
   surgeries: [String]
});


const medicationSchema = new mongoose.Schema({
   name: String,
   dosage: String,
   frequency: String
});


const vaccinationSchema = new mongoose.Schema({
   name: String,
   date: String
});


const primaryCarePhysicianSchema = new mongoose.Schema({
   name: String,
   contact: String
});



const prescriptionSchema = new mongoose.Schema({
   name: String,
   dosage: String,
   instructions: String
});


const invoiceSchema = new mongoose.Schema({
   invoiceNumber: String,
   amount: Number,
   status: String
});


const insuranceClaimSchema = new mongoose.Schema({
   claimNumber: String,
   amount: Number,
   status: String
});


const billingSchema = new mongoose.Schema({
   invoices: [invoiceSchema],
   insuranceClaims: [insuranceClaimSchema]
});


const patientSchema = new mongoose.Schema({
   name: String,
   dateOfBirth: String,
   gender: String,
   contact: String,
   emergencyContact: emergencyContactSchema,
   ssn: String,
   insurance: insuranceSchema,
   medicalHistory: medicalHistorySchema,
   medications: [medicationSchema],
   vaccinations: [vaccinationSchema],
   primaryCarePhysician: primaryCarePhysicianSchema,
   prescriptions: [prescriptionSchema],
   billing: billingSchema
});


module.exports = mongoose.model('Patient', patientSchema);