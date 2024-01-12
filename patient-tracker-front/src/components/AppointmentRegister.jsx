import React, { useEffect, useState } from 'react';
import { FormInput, SubmitBtn } from '../components';
import { Form, useLoaderData } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { customFetch } from '../utils';
import { store } from '../store';
import { useQueryClient } from '@tanstack/react-query';


const singleAppointmentQuery = (id) => {
   return {
     queryKey: ['singleAppointment', id],
     queryFn: () => customFetch(`/appointments/${id}`),
   };
  };
 
 
  export const loader =
   (queryClient) =>
   async ({ request }) => {
       queryClient.invalidateQueries(['appointments']);
       const params = Object.fromEntries([
           ...new URL(request.url).searchParams.entries(),
         ]);
        
       if(!params.apptId) return null
     const response = await queryClient.ensureQueryData(
       singleAppointmentQuery(params.apptId)
     );
     const appointment  = response.data;
     return appointment;
   };
 
const AppointmentRegister = ({ onSubmit })=>{


   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const patientId = queryParams.get('patientId');
   const id = queryParams.get('apptId');
   const state = store.getState();
   const doctorId = state.userState.user._id;


   const [formData, setFormData] = useState({
       patient: patientId,
       doctor: doctorId,
       date: '',
       purpose: ''
   })


   const handleSubmit = (e) => {
       e.preventDefault();
       onSubmit(formData);
     };


     const handleChange = (event) => {
       const { name, value } = event.target;
       setFormData({ ...formData, [name]: value });
     };


   const appointment = useLoaderData();
   useEffect(() => {
   if(id&&appointment)
       setFormData({...appointment});
   }, [appointment]);

   return (
       <Form method='post' onSubmit={handleSubmit}>
           <h4 className='text-center text-3xl font-bold'>Manage Appointment</h4>
           <div className='flex flex-wrap gap-3 items-center justify-center'>
               <FormInput type='text' label='Date' name='date' value={formData.date} onChange={handleChange} size={'w-[250px]'}/>
               <FormInput type='text' label='purpose' name='purpose' value={formData.purpose} onChange={handleChange} size={'w-[500px]'}/>
           </div>
           <div className='mt-4'>
               <SubmitBtn text={id?'Edit Patient':'Add'} />
           </div>
       </Form>
   )
}

export default AppointmentRegister;