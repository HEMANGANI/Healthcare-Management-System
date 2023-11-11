import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PatientRegister, ManageProfile } from '../components';

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleRegistrationSubmit = (formData) => {
    // Add logic to handle registration submission
    console.log('Registering patient:', formData);
    // Example:
    // dispatch(registerPatient(formData));
    // Redirect or show success message
  };

  const handleProfileUpdate = (profileData) => {
    // Add logic to handle profile update submission
    console.log('Updating profile:', profileData);
    // Example:
    // dispatch(updateUserProfile(profileData));
    // Redirect or show success message
  };

  return (
    <section className='h-screen grid place-items-center'>
      <div className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
        <PatientRegister onSubmit={handleRegistrationSubmit} />
        <ManageProfile user={null} onSubmit={handleProfileUpdate} />
      </div>
    </section>
  );
};

export default ProfilePage;
