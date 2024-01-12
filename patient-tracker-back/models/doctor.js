const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const doctorSchema = new mongoose.Schema({
   username: String,
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   patients: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      default: [] // Default empty array for patients
    }],
});


// Pre-save hook to hash the password
doctorSchema.pre('save', async function(next) {
   if (this.isModified('password')) {
       this.password = await bcrypt.hash(this.password, 8);
   }
   next();
});


module.exports = mongoose.model('Doctor', doctorSchema);