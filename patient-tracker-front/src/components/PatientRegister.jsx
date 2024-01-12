import React, { useEffect, useState } from 'react';
import { FormInput, SubmitBtn } from '../components';
import { Form, useLoaderData } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { customFetch } from '../utils';
import { useQueryClient } from '@tanstack/react-query';




const singlePatientsQuery = (id) => {
return {
  queryKey: ['singlePatient', id],
  queryFn: () => customFetch(`/patients/${id}`),
};
};

export const loader =
(queryClient) =>
async ({ params }) => {
 queryClient.invalidateQueries(['patients']);
  const response = await queryClient.ensureQueryData(
    singlePatientsQuery(params.id)
  );
  const patient  = response.data;
  return patient;
};




const PatientRegister = ({ onSubmit }) => {
const [formData, setFormData] = useState({
  name: '',
  dateOfBirth: '',
  gender: '',
  contact: '',
  emergencyContact: {name: '', relationship: '', contact: ''},
  ssn: '',
  insurance: {provider: '', policyNumber: ''},
  medicalHistory: {
    allergies: [
    ''
    ],
    chronicConditions: [
     ''
    ],
    surgeries: [
     ''
    ],
  },
  medications: [
    {
      name: '',
      dosage: '',
      frequency: '',
    },
  ],
  vaccinations: [
    {
      name: '',
      date: '',
    }
  ],
  primaryCarePhysician: {
    name: '',
    contact: '',
  },
  prescriptions: [
    {
      name: '',
      dosage: '',
      instructions: '',
    }
  ],
  billing: {
    invoices: [
      {
        invoiceNumber: '',
        amount: null,
        status: '',
      }
    ],
    insuranceClaims: [
      {
        claimNumber: '',
        amount: null,
        status: '',
      }
    ],
  }
 });


const {id} = useParams();
const patient = useLoaderData();


useEffect(() => {
  if(id&&patient)
  setFormData({...patient});
}, [patient]);


// useEffect(() => {
//   console.log(formData)
// }, [formData]);




// useEffect(()=>{console.log(formData)},[formData])
const handleChange = (event) => {
  const { name, value } = event.target;
   if (name.includes('.')) {
    const [mainKey, subKey, index] = name.split('.');
    if (index !== undefined) {
      // Handling dynamic arrays in nested objects
      const updatedArray = formData[mainKey][subKey].map((item, i) => {
        return i === parseInt(index, 10) ? value : item;
      });
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [subKey]: updatedArray
        }
      });
    } else {
      // Handling nested object properties
      setFormData({
        ...formData,
        [mainKey]: {
          ...formData[mainKey],
          [subKey]: value
        }
      });
    }
  } else {
    setFormData({ ...formData, [name]: value });
  }
};


const handleChangeArrObj = (event) => {
  const { name, value } = event.target;
   // Splitting the name attribute to identify array and index (if any)
  const nameParts = name.split('.');
     // Handling array of objects (e.g., 'medications.0.name')
    const arrayName = nameParts[0]; // e.g., 'medications'
    const arrayIndex = parseInt(nameParts[1], 10); // e.g., 0
    const arrayField = nameParts[2]; // e.g., 'name'


    setFormData({
      ...formData,
      [arrayName]: formData[arrayName].map((item, index) =>
        index === arrayIndex ? { ...item, [arrayField]: value } : item
      ),
    });
};


const handleChangeBilling = (event) => {
  const { name, value } = event.target;
   // Splitting the name attribute to identify array and index (if any)
  const nameParts = name.split('.');
     // Handling array of objects (e.g., 'medications.0.name')
    const arrayName = nameParts[1]; // e.g., 'medications'
    const arrayIndex = parseInt(nameParts[2], 10); // e.g., 0
    const arrayField = nameParts[3]; // e.g., 'name'
    setFormData({
      ...formData,
      billing: {
        ...formData.billing,
        [arrayName]: formData.billing[arrayName].map((item, index) =>
        index === arrayIndex ? { ...item, [arrayField]: value } : item
      ),
      }
    });
};
 const addField = (path, value) => {
  const paths = path.split('.');
  const lastKey = paths.pop();
  const newArray = [...getValue(formData, paths)[lastKey], value];
   setFormData(setValue(formData, path, newArray));
};
 const removeField = (path, index) => {
  const paths = path.split('.');
  const lastKey = paths.pop();
  const newArray = getValue(formData, paths)[lastKey].filter((_, i) => i !== index);
   setFormData(setValue(formData, path, newArray));
};
 const getValue = (obj, path) => {
  return path.reduce((acc, part) => acc && acc[part], obj);
};
 const setValue = (obj, path, newValue) => {
  const paths = path.split('.');
  const lastKey = paths.pop();
  const lastObj = paths.reduce((acc, part) => acc[part], obj);
   lastObj[lastKey] = newValue;
  return { ...obj };
};
 const handleSubmit = (e) => {
  e.preventDefault();
  onSubmit(formData);
};




return (
  <Form method='post' onSubmit={handleSubmit}>
    <h4 className='text-center text-3xl font-bold'>Patient Registration</h4>
    <div className='flex flex-wrap gap-3 items-center justify-center'>
      <FormInput type='text' label='Name' name='name' value={formData.name} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Date of Birth' name='dateOfBirth' value={formData.dateOfBirth} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Gender' name='gender' value={formData.gender} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Contact' name='contact' value={formData.contact} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='SSN' name='ssn' value={formData.ssn} onChange={handleChange} size={'w-[250px]'}/>
      <br />
    </div>
      <h4 className='text-center text-xl mt-5 font-bold'>EmergencyContact Information</h4>
      <div className='flex flex-wrap gap-3 items-center justify-center'>
      <FormInput type='text' label='Name' name='emergencyContact.name' value={formData.emergencyContact.name} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Relationship' name='emergencyContact.relationship' value={formData.emergencyContact.relationship} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Contact' name='emergencyContact.contact' value={formData.emergencyContact.contact} onChange={handleChange} size={'w-[250px]'}/>
      </div >
      <h4 className='text-center text-xl mt-5 font-bold'>Insurance Information</h4>
      <div className='flex flex-wrap gap-3 items-center justify-center'>
      <FormInput type='text' label='Provider' name='insurance.provider' value={formData.insurance.provider} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='PolicyNumber' name='insurance.policyNumber' value={formData.insurance.policyNumber} onChange={handleChange} size={'w-[250px]'}/>
      </div >
      <h4 className='text-center text-xl mt-5 font-bold'>Medical History Information</h4>
      {formData.medicalHistory.allergies.map((allergy, index)=>{
          return <React.Fragment key={`allergy-${index}`}>
                  <FormInput type='text' label={`Allergies-${index+1}`}  name={`medicalHistory.allergies.${index}`} value={allergy} onChange={handleChange} size={'w-[250px]'}/>
                  {index > 0 && (
                    <button type='button' className="mb-4 bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded" onClick={() => removeField('medicalHistory.allergies', index)}>Remove Allergy</button>
                  )}
                </React.Fragment>


      })}
      <button type='button'className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('medicalHistory.allergies','')}>Add Allergy</button>
    
      {formData.medicalHistory.chronicConditions.map((chronicCondition, index)=>{
          return  <React.Fragment key={`cc-${index}`}>
                  <FormInput type='text' label={`ChronicConditions-${index+1}`}  name={`medicalHistory.chronicConditions.${index}`} value={chronicCondition} onChange={handleChange} size={'w-[250px]'}/>
                  {index > 0 && (
                    <button type='button' className="mb-4 bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded" onClick={() => removeField('medicalHistory.chronicConditions', index)}>Remove Chronic Conditions</button>
                  )}
                 </React.Fragment>
      })}
      <button type='button'className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('medicalHistory.chronicConditions','')}>Add Chronic Conditions</button>
      {formData.medicalHistory.surgeries.map((surgery, index)=>{
          return <React.Fragment key={`surgeries-${index}`}>
                  <FormInput type='text' label={`Surgeries-${index+1}`}  name={`medicalHistory.surgeries.${index}`} value={surgery} onChange={handleChange} size={'w-[250px]'}/>
                  {index > 0 && (
                    <button type='button' className="mb-4 bg-blue-500 hover:bg-blue-700 mt-2 text-white font-bold py-2 px-4 rounded" onClick={() => removeField('medicalHistory.surgeries', index)}>Remove Surgery</button>
                  )}
                 </React.Fragment>
      })}
      <button type='button'className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('medicalHistory.surgeries','')}>Add Surgery</button>
    
      <h4 className='text-center text-xl mt-5 font-bold'>Medications</h4>
      {/* MEDICATIONS */}
      {formData.medications.map((medication, index) => (
      <div key={`medication-${index}`}  className='flex justify-around items-center gap-4'>
        <FormInput
          type="text"
          label={`Medication Name ${index + 1}`}
          name={`medications.${index}.name`}
          value={medication.name}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Dosage ${index + 1}`}
          name={`medications.${index}.dosage`}
          value={medication.dosage}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Frequency ${index + 1}`}
          name={`medications.${index}.frequency`}
          value={medication.frequency}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        {/* Button to remove this medication */}
        {index > 0 && (
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-5"  onClick={() => removeField('medications', index)}>Remove Medication</button>
        )}
      </div>
    ))}
    {/* Button to add a new medication */}
    <button type="button" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('medications', {
      name: '',
      dosage: '',
      frequency: '',
    })}>Add Medication</button>


      {/* END OF MEDICATIONS */}




      {/* VACCINATIONS */}
      <h4 className='text-center text-xl mt-5 font-bold'>Vaccinations</h4>
      {formData.vaccinations.map((vaccination, index) => (
      <div key={`vaccination-${index}`}  className='flex justify-around items-center gap-4'>
        <FormInput
          type="text"
          label={`Vaccination Name ${index + 1}`}
          name={`vaccinations.${index}.name`}
          value={vaccination.name}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Date ${index + 1}`}
          name={`vaccinations.${index}.date`}
          value={vaccination.date}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
      
        {/* Button to remove this vaccination */}
        {index > 0 && (
          <button type="button" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-5"  onClick={() => removeField('vaccinations', index)}>Remove Vaccination</button>
        )}
      </div>
    ))}
    {/* Button to add a new vaccination */}
    <button type="button" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('vaccinations', {
      name: '',
     date:''
    })}>Add Vaccination</button>


      {/* END OF VACCINATIONS */}
  
      <h4 className='text-center text-xl mt-5 font-bold'>Primary Care Physician Information</h4>
      <div className='flex flex-wrap gap-3 items-center justify-center'>
      <FormInput type='text' label='Name' name='primaryCarePhysician.name' value={formData.primaryCarePhysician.name} onChange={handleChange} size={'w-[250px]'}/>
      <FormInput type='text' label='Contact' name='primaryCarePhysician.contact' value={formData.primaryCarePhysician.contact} onChange={handleChange} size={'w-[250px]'}/>
      </div >


    {/* PRESCRIPTION */}
    <h4 className='text-center text-xl mt-5 font-bold'>Prescriptions</h4>
      {formData.prescriptions.map((prescription, index) => (
      <div key={`prescription-${index}`}  className='flex justify-around items-center gap-4'>
        <FormInput
          type="text"
          label={`Prescription Name ${index + 1}`}
          name={`prescriptions.${index}.name`}
          value={prescription.name}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Dosage ${index + 1}`}
          name={`prescriptions.${index}.dosage`}
          value={prescription.dosage}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Instructions ${index + 1}`}
          name={`prescriptions.${index}.instructions`}
          value={prescription.instructions}
          onChange={handleChangeArrObj}
          size="w-[250px]"
        />
      
        {/* Button to remove this prescription */}
        {index > 0 && (
          <button type="button" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-5"  onClick={() => removeField('prescriptions', index)}>Remove Prescription</button>
        )}
      </div>
    ))}
    {/* Button to add a new prescription */}
    <button type="button" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('prescriptions', {
      name: '',
      dosage:'',
      instructions:''
    })}>Add Prescription</button>


      {/* END OF PRESCRIPTION */}


      {/* Billing Invoice */}
    <h4 className='text-center text-xl mt-5 font-bold'>Billing Invoice</h4>
      {formData.billing.invoices.map((invoice, index) => (
      <div key={`invoices-${index}`} className='flex justify-around items-center gap-4'>
        <FormInput
          type="text"
          label={`Invoice Number ${index + 1}`}
          name={`billing.invoices.${index}.invoiceNumber`}
          value={invoice.invoiceNumber}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Invoice Amount ${index + 1}`}
          name={`billing.invoices.${index}.amount`}
          value={invoice.amount}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Invoice Status ${index + 1}`}
          name={`billing.invoices.${index}.status`}
          value={invoice.status}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
      
        {/* Button to remove this invoice */}
        {index > 0 && (
          <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-5"  onClick={() => removeField('billing.invoices', index)}>Remove Invoice</button>
        )}
      </div>
    ))}
    {/* Button to add a new invoice */}
    <button type="button" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('billing.invoices', {
      invoiceNumber: '',
      amount:'',
      status:''
    })}>Add Invoice</button>


      {/* END OF INVOICE */}




      {/* Billing Insurance Claims */}
    <h4 className='text-center text-xl mt-5 font-bold'>Insurance Claims</h4>
      {formData.billing.insuranceClaims.map((claim, index) => (
      <div key={`insuranceClaims-${index}`}  className='flex justify-around items-center gap-4'>
        <FormInput
          type="text"
          label={`Claim Number ${index + 1}`}
          name={`billing.insuranceClaims.${index}.claimNumber`}
          value={claim.claimNumber}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Claim Amount ${index + 1}`}
          name={`billing.insuranceClaims.${index}.amount`}
          value={claim.amount}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
        <FormInput
          type="text"
          label={`Claim Status ${index + 1}`}
          name={`billing.insuranceClaims.${index}.status`}
          value={claim.status}
          onChange={handleChangeBilling}
          size="w-[250px]"
        />
      
        {index > 0 && (
          <button type="button" className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-5"  onClick={() => removeField('billing.insuranceClaims', index)}>Remove Insurance claim</button>
        )}
      </div>
    ))}
    <button type="button" className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mt-2"  onClick={() => addField('billing.insuranceClaims', {
      claimNumber: '',
      amount:'',
      status:''
    })}>Add Insurance claim</button>


      {/* END OF Insurance Claim */}


    <div className='mt-4'>
      <SubmitBtn text={id?'Edit Patient':'Register'} />
    </div>
  </Form>
);
};


export default PatientRegister;