import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useLoaderData } from 'react-router-dom';
import { customFetch } from '../utils';


const singlePatientsQuery = (id) => {
 return {
   queryKey: ['singlePatient', id],
   queryFn: () => customFetch(`/patients/${id}`),
 };
};


export const loader =
 (queryClient) =>
 async ({ params }) => {
   const response = await queryClient.ensureQueryData(
     singlePatientsQuery(params.id)
   );
   const patient  = response.data;
   return patient;
 };




const SinglePatient = () => {
 const navigate = useNavigate();
 const handleGoBack = () => {
   navigate(-1); // This will navigate the user back to the previous page
 };
 const handleEditPatient = (id) => {
   navigate(`/manage-patient/${id}`);
 };
 const handlePatientMetrics = (id) => {
   navigate(`/health-metrics/${id}`);
 };
 const patient = useLoaderData();


 return (
   <div className="container mx-auto p-6 font-mono">
   <div className='flex gap=5 items-center justify-between'>
   <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleGoBack}> Go Back</button>
   <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{handleEditPatient(patient._id)}}> Edit Patient Details</button>
   <button className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{handlePatientMetrics(patient._id)}}> View Patient Health Metrics</button>
   </div>
     <h2 className="text-2xl font-bold mb-4">Patient Details</h2>
     <div>
       <h3 className="text-xl font-bold mb-2">{patient.name}</h3>
       <div>
         <p>Date of Birth: {patient.dateOfBirth}</p>
         <p>Gender: {patient.gender}</p>
         <p>Contact: {patient.contact}</p>
         <p>Emergency Contact: {patient.emergencyContact.name} ({patient.emergencyContact.relationship}), {patient.emergencyContact.contact}</p>
         <p>SSN: {patient.ssn}</p>
         <p>Insurance Provider: {patient.insurance.provider}</p>
         <p>Policy Number: {patient.insurance.policyNumber}</p>
         <div>
           <h4 className="text-lg font-bold mb-2">Medical History</h4>
           <p>Allergies: {patient.medicalHistory.allergies.join(', ')}</p>
           <p>Chronic Conditions: {patient.medicalHistory.chronicConditions.join(', ')}</p>
           <p>Surgeries: {patient.medicalHistory.surgeries.join(', ')}</p>
         </div>
         <div>
           <h4 className="text-lg font-bold mb-2">Medications</h4>
           {patient.medications.map((medication, index) => (
             <div key={index}>
               <p>Name: {medication.name}</p>
               <p>Dosage: {medication.dosage}</p>
               <p>Frequency: {medication.frequency}</p>
             </div>
           ))}
         </div>
         <div>
           <h4 className="text-lg font-bold mb-2">Vaccinations</h4>
           {patient.vaccinations.map((vaccination, index) => (
             <div key={index}>
               <p>Name: {vaccination.name}</p>
               <p>Date: {vaccination.date}</p>
             </div>
           ))}
         </div>
         <div>
           <h4 className="text-lg font-bold mb-2">Primary Care Physician</h4>
           <p>Name: {patient.primaryCarePhysician.name}</p>
           <p>Contact: {patient.primaryCarePhysician.contact}</p>
         </div>


         <div>
           <h4 className="text-lg font-bold mb-2">Prescriptions</h4>
           {patient.prescriptions.map((prescription, index) => (
             <div key={index}>
               <p>Name: {prescription.name}</p>
               <p>Dosage: {prescription.dosage}</p>
               <p>Instructions: {prescription.instructions}</p>
             </div>
           ))}
         </div>
         <div>
           <h4 className="text-lg font-bold mb-2">Billing</h4>
           <div>
             <h5 className="text-lg font-bold mb-2">Invoices</h5>
             {patient.billing.invoices.map((invoice, index) => (
               <div key={index}>
                 <p>Invoice Number: {invoice.invoiceNumber}</p>
                 <p>Amount: {invoice.amount}</p>
                 <p>Status: {invoice.status}</p>
               </div>
             ))}
           </div>
           <div>
             <h5 className="text-lg font-bold mb-2">Insurance Claims</h5>
             {patient.billing.insuranceClaims.map((claim, index) => (
               <div key={index}>
                 <p>Claim Number: {claim.claimNumber}</p>
                 <p>Amount: {claim.amount}</p>
                 <p>Status: {claim.status}</p>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   </div>
 );
};


export default SinglePatient;