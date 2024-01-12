const PatientHealthMetrics = require('../models/patientHealthMetrics'); // Adjust the path according to your project structure


const getPatientHealthMetrics = async (req, res) => {
   try {
       const patientId = req.params.patientId; // Assuming you're fetching data for a specific patient


       const data = await PatientHealthMetrics.findOne({ patientId: patientId });
       if (!data) {
           return res.status(404).json({ message: 'No health metrics found for the given patient ID' });
       }


       res.status(200).json(data);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};


module.exports = { getPatientHealthMetrics };