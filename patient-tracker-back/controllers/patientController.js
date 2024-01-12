const Patient = require('../models/patients');


// Get all patients
getPatients = async (req, res) => {
  try {
      const patients = await Patient.find();
      res.json(patients);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


// Get a single patient by ID
getPatientById = async (req, res) => {
  try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ message: "Patient not found" });
      res.json(patient);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


// Create a new patient
createPatient = async (req, res) => {
  const patient = new Patient(req.body);
  try {
      const newPatient = await patient.save();
      res.status(201).json(newPatient);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};


// Update a patient
updatePatient = async (req, res) => {
  try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ message: "Patient not found" });


      Object.assign(patient, req.body);
      const updatedPatient = await patient.save();
      res.json(updatedPatient);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};


// Delete a patient
deletePatient = async (req, res) => {
  try {
      const patient = await Patient.findById(req.params.id);
      if (!patient) return res.status(404).json({ message: "Patient not found" });


    await patient.deleteOne()
      res.json({ message: "Patient deleted" });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};


module.exports = { getPatients, getPatientById, createPatient, updatePatient, deletePatient };
