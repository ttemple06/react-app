import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import StudentTableRow from './Row.component';

const { REACT_APP_API_ENDPOINT } = process.env;

const ListStudent = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/students/`)
      .then(({ data }) => {
        setStudents(data);
      })
      .catch((error) => {
        console.log('RESPONSE ERROR', error);
      });
  }, []);

  const DataTable = () => {
    return students.map((row, index) => {
      return <StudentTableRow student={row} key={index} />;
    });
  };

  return (
    <div className='table-wrapper'>
      <h1>Students</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default ListStudent;
