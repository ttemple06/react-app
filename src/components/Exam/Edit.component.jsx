import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExamForm from './Form/ExamForm';
import { useParams, useNavigate } from 'react-router-dom';

const { REACT_APP_API_ENDPOINT } = process.env;

const EditExam = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    title: '',
  });
  let navigate = useNavigate();

  const onSubmit = async (testObject) => {
    const body = Object.assign({ id: parseInt(id) }, testObject);
    const { data } = await axios.put(`${REACT_APP_API_ENDPOINT}/exams/${id}`, body);
    if (data.id) {
      alert('Exam successfully updated');
      navigate('/list-exam');
    } else {
      console.log('RESPONSE ERROR', data);
      alert('Something went wrong');
    }
  };

  // Load data from server and reinitialize test form
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/exams/${id}`)
      .then((res) => {
        const { title } = res.data;
        setFormValues({ title });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return test form
  return (
    <div className='form-wrapper'>
      <h1>Edit Exam</h1>
      <ExamForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
        Update Exam
      </ExamForm>
    </div>
  );
};

export default EditExam;
