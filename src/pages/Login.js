import React from 'react';

import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  return (
    <Container>
      <Row>
        <Col md={5} className='login__bg'></Col>
        <Col
          md={7}
          className='d-flex flex-directiomn-column justify-content-center align-items-center'>
          <Form style={{ width: '80%', maxWidth: 500 }}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check type='checkbox' label='Check me out' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Login
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Don't have an account ? <Link to='/signup'>Signup</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
