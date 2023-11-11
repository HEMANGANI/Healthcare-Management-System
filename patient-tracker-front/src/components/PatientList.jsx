import React from 'react';
import { useNavigate } from 'react-router-dom';


const PatientList = ({ patients }) => {
  const navigate = useNavigate();

  const handleRowClick = (patient) => {
    navigate(`/medical-history/${patient.id}`);
  };

  return (
    <section className="container mx-auto p-6 font-mono">
      <h2 className="text-2xl font-bold mb-4">Patients</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Date of Birth</th>
              <th className="p-2 border">Gender</th>
              <th className="p-2 border">Contact</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(patient)}
              >
                <td className="p-2 border">{patient.id}</td>
                <td className="p-2 border">{patient.name}</td>
                <td className="p-2 border">{patient.dateOfBirth}</td>
                <td className="p-2 border">{patient.gender}</td>
                <td className="p-2 border">{patient.contact}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PatientList;
