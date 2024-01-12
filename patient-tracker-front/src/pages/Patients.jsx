import React from 'react';
import { patientsData } from '../patiensData';
import { PatientList } from '../components';
import { useSelector } from 'react-redux';
import { customFetch } from '../utils';
import { useLoaderData } from 'react-router-dom';
import { store } from '../store';


const allPatientsQuery = (queryParams) => {
 const state = store.getState();
 const doctorId = state.userState.user._id;


 const url = `/doctors/patients/${doctorId}`;


 return {
   queryKey: [
     'patients', doctorId
   ],
   queryFn: () =>
     customFetch(url),
 };
};


export const loader =
 (queryClient) =>
 async ({ request }) => {
   const params = Object.fromEntries([
     ...new URL(request.url).searchParams.entries(),
   ]);
   // const user = useSelector((state) => state.userState.user);


   const response = await queryClient.ensureQueryData(
     allPatientsQuery(params)
   );
   const patients  = response.data;
   return patients;
 };




const Patients = () => {
 const patientsData = useLoaderData();
 return (
   <div>
     <PatientList initialPatients={patientsData} />
   </div>
 );
};


export default Patients;