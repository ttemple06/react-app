import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { REACT_APP_API_ENDPOINT } = process.env;

const ExamTableRow = (props) => {
  const { id, title } = props.test;

  const deleteExam = async () => {
    try {
      await axios.delete(`${REACT_APP_API_ENDPOINT}/exams/${id}`);
      alert('Exam successfully deleted');
      window.location.reload();
    } catch (err) {
      console.log('RESPONSE ERROR', err);
      alert('Something went wrong');
    }
  };

  return (
    <tr>
      <td>{title}</td>
      <td>
        <Link className='edit-link' to={`/edit-exam/${id}`}>
          Edit
        </Link>
        <Button onClick={deleteExam} size='sm' variant='danger'>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ExamTableRow;
