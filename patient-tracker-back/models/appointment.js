const mongoose = require('mongoose');


const appointmentSchema = new mongoose.Schema({
   patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient'
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor'
    },
   date: String,
   purpose: String,
});


module.exports = mongoose.model('Appointment', appointmentSchema);