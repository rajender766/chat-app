import React, { useState } from 'react';
import { Row, Col, Container, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Signup.css';

import profile from '../assets/bot.jpeg';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  console.log(uploadingImage);
  const validateImg = (e) => {
    const file = e.target.files[0];
    if (file.size > 1048576) {
      alert('Max file size is 1mb');
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImg = async (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'dnkdrpxjf');
    try {
      setUploadingImage(true);
      let res = await fetch(
        'https://api.cloudinary.com/v1_1/raj/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const urlData = await res.json();
      setUploadingImage(false);
      return urlData.url;
    } catch (e) {
      setUploadingImage(false);
      console.log(e);
    }
  };

  const handleSinup = async (e) => {
    e.preventDefault();
    if (!image) return alert('Please upload your profile image');
    const url = await uploadImg(image);
    console.log(url);
  };

  return (
    <Container>
      <Row>
        <Col
          md={7}
          className='d-flex flex-directiomn-column justify-content-center align-items-center'>
          <Form style={{ width: '80%', maxWidth: 500 }} onSubmit={handleSinup}>
            <h1 className='text-center'>Create account</h1>
            <div className='signup-profile__container'>
              <img
                src={imagePreview || profile}
                className='signup-profie-pic'
                alt='profile-img'
              />
              <label htmlFor='image-upload' className='image-upload-label'>
                <i className='fas fa-plus-circle add-picture-icon'></i>
              </label>
              <input
                type='file'
                id='image-upload'
                name='image-upload'
                hidden
                accept='image/png , image/jpeg'
                onChange={validateImg}
              />
            </div>
            <Form.Group className='mb-3' controlId='formBasicName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicCheckbox'>
              <Form.Check
                type='checkbox'
                label='Check me out'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Create account
            </Button>
            <div className='py-4'>
              <p className='text-center'>
                Already have an account ? <Link to='/login'>Login</Link>
              </p>
            </div>
          </Form>
        </Col>
        <Col md={5} className='signup__bg'></Col>
      </Row>
    </Container>
  );
};

export default Signup;
