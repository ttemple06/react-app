import React, { useState, useEffect } from 'react';
import { validationSchema } from './ValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button } from 'react-bootstrap';
import CustomSelect from '../../Formik/CustomSelect.component';
import axios from 'axios';

const { REACT_APP_API_ENDPOINT } = process.env;

const StudentForm = (props) => {
  const { event, initialValues } = props;
  const [allExams, setAllExams] = useState([]);

  const getAllExams = async () => {
    const { data } = await axios.get(`${REACT_APP_API_ENDPOINT}/exams/`);
    const examData = data.map((exam) => {
      return { value: exam.id, label: exam.title };
    });
    setAllExams(examData);
  };

  /**
   * this hook is called on first render only;
   * remove [] if you want on each update;
   * or put a var inside the [] if you want to invoke
   * when that var is updated
   */
  useEffect(() => {
    getAllExams();
  }, []);

  return (
    <div className='form-wrapper'>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor='firstName'>First Name</label>
            <Field name='firstName' type='text' className='form-control' />
            <ErrorMessage name='firstName' className='d-block invalid-feedback' component='span' />
          </FormGroup>
          <FormGroup>
            <label htmlFor='lastName'>Last Name</label>
            <Field name='lastName' type='text' className='form-control' />
            <ErrorMessage name='lastName' className='d-block invalid-feedback' component='span' />
          </FormGroup>
          {event === 'edit' && (
            <FormGroup>
              <label htmlFor='exams'>Assigned Exam(s)</label>
              <Field
                className='custom-select'
                name='exams'
                options={allExams}
                component={CustomSelect}
                placeholder='Select exam(s)...'
                isMulti={true}
                initialValues={initialValues.exams}
              />
            </FormGroup>
          )}
          <Button variant='danger' size='lg' block='block' type='submit'>
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default StudentForm;
