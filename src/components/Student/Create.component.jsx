import React, { useState } from 'react';
import axios from 'axios';
import StudentForm from './Form/StudentForm';

const { REACT_APP_API_ENDPOINT } = process.env;

const CreateStudent = () => {
  const [formValues] = useState({ firstName: '', lastName: '', exams: [] });

  const onSubmit = async (studentObject) => {
    const { data } = await axios.post(`${REACT_APP_API_ENDPOINT}/students/`, studentObject);
    if (data.id) {
      alert('Student successfully created');
    } else {
      console.log('RESPONSE ERROR', data);
      alert('Something went wrong');
    }
  };

  // Return student form
  return (
    <div className='form-wrapper'>
      <h1>Create a Student</h1>
      <StudentForm event='create' initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
        Create Student
      </StudentForm>
    </div>
  );
};

export default CreateStudent;
