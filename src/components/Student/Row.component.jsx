import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const { REACT_APP_API_ENDPOINT } = process.env;

const StudentTableRow = (props) => {
  const { id, firstName, lastName } = props.student;

  const deleteStudent = async () => {
    try {
      await axios.delete(`${REACT_APP_API_ENDPOINT}/students/${id}`);
      alert('Student successfully deleted');
      window.location.reload();
    } catch (err) {
      console.log('RESPONSE ERROR', err);
      alert('Something went wrong');
    }
  };

  return (
    <tr>
      <td>{firstName}</td>
      <td>{lastName}</td>
      <td>
        <Link className='edit-link' to={`/edit-student/${id}`}>
          Edit
        </Link>
        <Button onClick={deleteStudent} size='sm' variant='danger'>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default StudentTableRow;
