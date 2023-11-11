import React, { useState } from 'react';
import { FormInput, SubmitBtn } from '../components';
import { Form } from 'react-router-dom';

const PatientRegister = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form method='post' onSubmit={handleSubmit}>
      <h4 className='text-center text-3xl font-bold'>Patient Registration</h4>
      <FormInput type='text' label='Name' name='name' value={formData.name} onChange={handleChange} />
      <FormInput type='number' label='Age' name='age' value={formData.age} onChange={handleChange} />
      <FormInput type='text' label='Contact' name='contact' value={formData.contact} onChange={handleChange} />
      <div className='mt-4'>
        <SubmitBtn text='Register' />
      </div>
    </Form>
  );
};

export default PatientRegister;
