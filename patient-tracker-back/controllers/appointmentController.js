const Appointment = require('../models/appointment'); // Adjust path as necessary


getAllAppointments = async (req, res) => {
  try {
      const appointments = await Appointment.find();
      res.json(appointments);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
};

getAppointmentById = async (req, res) => {
  const { id } = req.params; // Get the appointment ID from the request parameters

  try {
    const appointment = await Appointment.findById(id);

    if (appointment) {
      res.json(appointment);
    } else {
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


scheduleAppointment = async (req, res) => {
  const appointment = new Appointment({
      patient: req.body.patient,
      date: req.body.date,
      purpose: req.body.purpose,
      doctor: req.body.doctor
  });


  try {
      const newAppointment = await appointment.save();
      res.status(201).json(newAppointment);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
};

getAppointmentsByDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentsWithPatients = await Appointment.find({ doctor: doctorId })
    .populate('patient', 'name dateOfBirth contact') // Adjust fields as per requirement
    .exec();

    res.status(200).json(appointmentsWithPatients);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
}

updateAppointment = async (req, res) => {
  const { id } = req.params; 

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(id);

    if (appointment) {
      if (req.body.patient) appointment.patient = req.body.patient;
      if (req.body.date) appointment.date = req.body.date;
      if (req.body.purpose) appointment.purpose = req.body.purpose;
      if (req.body.doctor) appointment.doctor = req.body.doctor;

      // Save the updated appointment
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { getAllAppointments,getAppointmentById, scheduleAppointment, getAppointmentsByDoctor, updateAppointment, deleteAppointment };