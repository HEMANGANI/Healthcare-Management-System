const Doctor = require('../models/doctor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Patient = require('../models/patients')

registerDoctor = async (req, res) => {
 try {
     const doctor = new Doctor(req.body);
     await doctor.save();
     res.status(201).send({ message: "Doctor registered successfully" });
 } catch (error) {
     res.status(400).send(error);
 }
};


loginDoctor = async (req, res) => {
 try {
     const { email, password } = req.body;
     const doctor = await Doctor.findOne({ email });
     if (!doctor) {
         return res.status(404).send({ message: "Doctor not found" });
     }


     const isPasswordMatch = await bcrypt.compare(password, doctor.password);
     if (!isPasswordMatch) {
         return res.status(400).send({ message: "Invalid credentials" });
     }


   const token = jwt.sign({ _id: doctor._id }, process.env.JWT_SECRET);
     const doctorData = doctor.toObject();
     delete doctorData.password;
     res.send({ doctor: doctorData, token });
 } catch (error) {
     res.status(500).send(error);
 }
};




getPatientDetailsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    // Fetch the doctor and populate the 'patients' array with full patient documents
    const patientsForDoctor = await Doctor.findById(doctorId).populate('patients');
     if (!patientsForDoctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    if (!patientsForDoctor.patients) {
      return res.status(404).json({ message: 'Patients not found' });
    }
     res.status(200).json(patientsForDoctor.patients);
  } catch (error) {
    console.error('Error fetching doctor with patient details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


addPatientForDoctor = async (req, res) => {
 try {
   const { doctorId } = req.params;
   const patientData = req.body;


   // Create a new patient
   const newPatient = new Patient(patientData);
   await newPatient.save();


   // Add the patient's ID to the doctor's patients array
   await Doctor.findByIdAndUpdate(doctorId, {
     $push: { patients: newPatient._id }
   });


   res.status(201).json({ message: 'Patient added successfully', patient: newPatient });
 } catch (error) {
   console.error('Error adding patient to doctor:', error);
   res.status(500).json({ message: 'Internal server error' });
 }
};
module.exports = { registerDoctor, loginDoctor, getPatientDetailsForDoctor, addPatientForDoctor };