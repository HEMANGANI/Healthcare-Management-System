import React from 'react';
import { patientsData } from '../patiensData';
import { PatientList } from '../components';

const Patients = () => {
  return (
    <div>
      <PatientList patients={patientsData} />
    </div>
  );
};

export default Patients;
