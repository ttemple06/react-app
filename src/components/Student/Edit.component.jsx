import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentForm from './Form/StudentForm';
import { useParams, useNavigate } from 'react-router-dom';

const { REACT_APP_API_ENDPOINT } = process.env;

const EditStudent = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    exams: [],
  });

  let navigate = useNavigate();

  const renameKeysForWrite = (exams) => {
    exams.forEach((exam) => {
      const keys = Object.keys(exam);
      keys.forEach((key) => {
        let title, id;
        switch (key) {
          case 'label':
            title = key.replace('label', 'title');
            exam[title] = exam[key];
            break;
          case 'value':
            id = key.replace('value', 'id');
            exam[id] = exam[key];
            break;
        }
        delete exam[key];
      });
    });
  };

  const renameKeysForRead = (exams) => {
    exams.forEach((exam) => {
      const keys = Object.keys(exam);
      keys.forEach((key) => {
        let label, value;
        switch (key) {
          case 'title':
            label = key.replace('title', 'label');
            exam[label] = exam[key];
            break;
          case 'id':
            value = key.replace('id', 'value');
            exam[value] = exam[key];
            break;
        }
        delete exam[key];
      });
    });
  };

  const onSubmit = async (studentObject) => {
    const body = Object.assign({ id: parseInt(id) }, studentObject);
    renameKeysForWrite(studentObject.exams);
    const { data } = await axios.put(`${REACT_APP_API_ENDPOINT}/students/${id}`, body);
    if (data.id) {
      alert('Student successfully updated');
      navigate('/list-student');
    } else {
      console.log('RESPONSE ERROR', data);
      alert('Something went wrong');
    }
  };

  // Load data from server and reinitialize student form
  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/students/${id}`)
      .then((res) => {
        const { firstName, lastName, exams } = res.data;
        renameKeysForRead(exams);
        setFormValues({ firstName, lastName, exams });
      })
      .catch((err) => console.log(err));
  }, []);

  // Return student form
  return (
    <div className='form-wrapper'>
      <h1>Edit Student</h1>
      <StudentForm event='edit' initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
        Update Student
      </StudentForm>
    </div>
  );
};

export default EditStudent;
