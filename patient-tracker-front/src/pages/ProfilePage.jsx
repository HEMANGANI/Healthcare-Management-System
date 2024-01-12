import React from 'react';
import { PatientRegister } from '../components';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { redirect } from 'react-router-dom';
import { store } from '../store';

const ProfilePage = () => {

 const handleRegistrationSubmit = async (formData) => {
   // Add logic to handle registration submission
   console.log('Registering patient:', formData);
   if(formData._id){
     try {
       const response = await customFetch.put(`/patients/${formData._id}`, formData);
       toast.success('Patient Edited Successfully');
       return redirect('/medical-history');
     } catch (error) {
       const errorMessage =
         error.message ||
         'Something went wrong, please try again later';
       toast.error(errorMessage);
       console.log(error);
       return null;
     }
   }
   else{
     try {
      const state = store.getState();
      const doctorId = state.userState.user._id;
       const response = await customFetch.post(`/doctors/patients/${doctorId}`, formData);
       toast.success('Patient Created Successfully');
       return redirect('/medical-history');
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
  <section className='h-screen grid place-items-center'>
    <div className='card w-full p-8 bg-base-100 shadow-lg flex gap-y-4'>
      <PatientRegister onSubmit={handleRegistrationSubmit} />
    </div>
  </section>
);
};


export default ProfilePage;