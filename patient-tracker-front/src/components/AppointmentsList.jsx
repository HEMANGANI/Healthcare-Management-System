import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { customFetch } from '../utils';
import { redirect } from 'react-router-dom';

const AppointmentsList = ({ appointments }) => {
const navigate = useNavigate();

const handleRowClick = (id) => {
  navigate(`/medical-history/${id}`);
};


const handleEditAppointment = (appointment) => {
 navigate(`/manage-appointments?patientId=${appointment.patient._id}&apptId=${appointment._id}`);
};

const handleDeleteAppointment = async (appointment) => {
 try {
   const response = await customFetch.delete(`/appointments/${appointment._id}`);
   toast.success('Appointment Deleted Successfully');
   return redirect('/appointments');
 } catch (error) {
   const errorMessage =
     error.message ||
     'Something went wrong, please try again later';
   toast.error(errorMessage);
   return null;
 }
};

return (
  <section className="container mx-auto p-6 font-mono">
    <h2 className="text-2xl font-bold mb-4">Patients</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Patient Name</th>
            <th className="p-2 border">Date of Birth</th>
            <th className="p-2 border">Patient Contact</th>
            <th className="p-2 border">Date of visit</th>
            <th className="p-2 border">Purpose of visit</th>
            <th className="p-2 border">Manage Appointment</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr
              key={appointment._id}
              className="cursor-pointer hover:bg-gray-100"
            >
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{index+1}</td>
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{appointment.patient.name}</td>
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{appointment.patient.dateOfBirth}</td>
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{appointment.patient.contact}</td>
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{appointment.date}</td>
              <td className="p-2 border" onClick={() => handleRowClick(appointment.patient._id)}>{appointment.purpose}</td>
              <td className='grid place-items-center gap-2'>
               <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-xs rounded" onClick={()=>{handleEditAppointment(appointment)}}> Edit</button>
               <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 text-xs rounded" onClick={()=>{handleDeleteAppointment(appointment)}}> Delete</button>
               </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);
};

export default AppointmentsList;