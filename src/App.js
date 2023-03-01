import React from 'react';
import { Nav, Navbar, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import addition React Components
import CreateStudent from './components/Student/Create.component';
import EditStudent from './components/Student/Edit.component';
import ListStudent from './components/Student/List.component';

import CreateExam from './components/Exam/Create.component';
import EditExam from './components/Exam/Edit.component';
import ListExam from './components/Exam/List.component';

// Authentication Components
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './components/Authentication/LoginButton.component';
import LogoutButton from './components/Authentication/LogoutButton.component';
import Welcome from './components/Authentication/Welcome.component';

// App Component
const App = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Navbar bg='dark' variant='dark'>
            <Container>
              <Navbar.Brand>
                <Link to={'/create-student'} className='nav-link'>
                  React Student Exams App
                  {isAuthenticated && <h6>Welcome, {user.name}</h6>}
                </Link>
              </Navbar.Brand>

              {isAuthenticated ? (
                <Nav className='justify-content-end'>
                  <Nav>
                    <Link to={'/create-student'} className='nav-link'>
                      Create Student
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={'/list-student'} className='nav-link'>
                      Student List
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={'/create-exam'} className='nav-link'>
                      Create Exam
                    </Link>
                  </Nav>
                  <Nav>
                    <Link to={'/list-exam'} className='nav-link'>
                      Exam List
                    </Link>
                  </Nav>
                  <Nav>
                    <LogoutButton />
                  </Nav>
                </Nav>
              ) : (
                <LoginButton />
              )}
            </Container>
          </Navbar>
        </header>

        <Container>
          <Row>
            <Col md={12}>
              <div className='wrapper'>
                <Routes>
                  <Route
                    exact
                    path='/'
                    element={isAuthenticated ? <CreateStudent /> : <Welcome />}
                  />
                  <Route path='/create-student' element={<CreateStudent />} />
                  <Route path='/edit-student/:id' element={<EditStudent />} />
                  <Route path='/list-student' element={<ListStudent />} />
                  <Route path='/create-exam' element={<CreateExam />} />
                  <Route path='/edit-exam/:id' element={<EditExam />} />
                  <Route path='/list-exam' element={<ListExam />} />
                </Routes>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};

export default App;
