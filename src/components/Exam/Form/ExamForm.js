import React from 'react';
import { validationSchema } from './ValidationSchema';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Button } from 'react-bootstrap';

const ExamForm = (props) => {
  return (
    <div className='form-wrapper'>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor='title'>Title</label>
            <Field name='title' type='text' className='form-control' />
            <ErrorMessage name='title' className='d-block invalid-feedback' component='span' />
          </FormGroup>
          <Button variant='danger' size='lg' block='block' type='submit'>
            {props.children}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default ExamForm;
