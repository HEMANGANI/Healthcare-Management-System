import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientList = ({ initialPatients }) => {
const navigate = useNavigate();
const [searchTerm, setSearchTerm] = useState('');
const [filteredPatients, setFilteredPatients] = useState(initialPatients);


const handleSearchChange = (event) => {
  const term = event.target.value;
  setSearchTerm(term);

  if (!term) {
      setFilteredPatients(initialPatients);
      return;
  }

  const lowercasedTerm = term.toLowerCase();
  const filtered = initialPatients.filter(patient =>
      patient.name.toLowerCase().includes(lowercasedTerm)
  );

  setFilteredPatients(filtered);
};

const handleRowClick = (patient) => {
  navigate(`/medical-history/${patient._id}`);
};
const handleAddAppointment = (patient) => {
  navigate(`/manage-appointments?patientId=${patient._id}`);
};


return (
  <section className="container mx-auto p-6 font-mono">
    <h2 className="text-2xl font-bold mb-4">Patients</h2>
    <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Date of Birth</th>
            <th className="p-2 border">Gender</th>
            <th className="p-2 border">Contact</th>
            <th className="p-2 border">Add Appointment</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients&&filteredPatients.length > 0? (filteredPatients.map((patient, index) => (
            <tr
              key={patient._id}
              className="cursor-pointer hover:bg-gray-100"
             
            >
              <td className="p-2 border" onClick={() => handleRowClick(patient)} >{index+1}</td>
              <td className="p-2 border" onClick={() => handleRowClick(patient)} >{patient.name}</td>
              <td className="p-2 border" onClick={() => handleRowClick(patient)} >{patient.dateOfBirth}</td>
              <td className="p-2 border" onClick={() => handleRowClick(patient)} >{patient.gender}</td>
              <td className="p-2 border" onClick={() => handleRowClick(patient)} >{patient.contact}</td>
              <td className='grid place-items-center'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded" onClick={()=>{handleAddAppointment(patient)}}> Add</button>
</td>
            </tr>
          ))):(<tr><td> Sorry, no patients found.</td></tr>)}
        </tbody>
      </table>
    </div>
  </section>
);
};

export default PatientList;