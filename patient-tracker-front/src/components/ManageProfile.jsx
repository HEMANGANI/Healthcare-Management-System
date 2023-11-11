import React, { useState } from 'react';
import { FormInput, SubmitBtn } from '../components';
import { Form } from 'react-router-dom';

const ManageProfile = ({ user, onSubmit }) => {
  const [profileData, setProfileData] = useState({
    name: user ? user.name : '',
    age: user ? user.age : '',
    contact: user ? user.contact : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profileData);
  };

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h4 className='text-center text-3xl font-bold'>Update Profile</h4>
      <FormInput type='text' label='Name' name='name' value={profileData.name} onChange={handleChange} />
      <FormInput type='number' label='Age' name='age' value={profileData.age} onChange={handleChange} />
      <FormInput type='text' label='Contact' name='contact' value={profileData.contact} onChange={handleChange} />
      <div className='mt-4'>
        <SubmitBtn text='Save Changes' />
      </div>
    </Form>
  );
};

export default ManageProfile;
