import React, { useState } from 'react';
import axios from 'axios';
import ExamForm from './Form/ExamForm';

const { REACT_APP_API_ENDPOINT } = process.env;

const CreateExam = () => {
  const [formValues] = useState({ title: '' });

  const onSubmit = async (testObject) => {
    const { data } = await axios.post(`${REACT_APP_API_ENDPOINT}/exams/`, testObject);
    if (data.id) {
      alert('Exam successfully created');
    } else {
      console.log('RESPONSE ERROR', data);
      alert('Something went wrong');
    }
  };

  // Return test form
  return (
    <div className='form-wrapper'>
      <h1>Create an Exam</h1>
      <ExamForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
        Create Exam
      </ExamForm>
    </div>
  );
};

export default CreateExam;
