import React from 'react';
import { AppointmentRegister } from '../components';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { redirect } from 'react-router-dom';

const ManageAppointment = () => {

const handleRegistrationSubmit = async (formData) => {
  // Add logic to handle registration submission  
  if(formData._id){
    try {
      const response = await customFetch.put(`/appointments/${formData._id}`, formData);
      toast.success('Appointment Edited Successfully');
      return redirect('/appointments');
    } catch (error) {
      const errorMessage =
        error.message ||
        'Something went wrong, please try again later';
      toast.error(errorMessage);
      return null;
    }
  }
  else{
    try {
      const response = await customFetch.post(`/appointments/`, formData);
      toast.success('Appointment Created Successfully');
      return redirect('/appointments');
    } catch (error) {
      const errorMessage =
        error.message ||
        'Something went wrong, please try again later';
      toast.error(errorMessage);
      return null;
    }
  }
 };

return (
  
  <section className='h-screen'>
    <div className='card w-full p-8 bg-base-100 shadow-lg flex gap-y-4'>
      <AppointmentRegister onSubmit={handleRegistrationSubmit} />
    </div>
  </section>
);
};

export default ManageAppointment;