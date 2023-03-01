import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import ExamTableRow from './Row.component';

const { REACT_APP_API_ENDPOINT } = process.env;

const ListExam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    axios
      .get(`${REACT_APP_API_ENDPOINT}/exams/`)
      .then(({ data }) => {
        setExams(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const DataTable = () => {
    return exams.map((row, index) => {
      return <ExamTableRow test={row} key={index} />;
    });
  };

  return (
    <div className='table-wrapper'>
      <h1>Exams</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{DataTable()}</tbody>
      </Table>
    </div>
  );
};

export default ListExam;
