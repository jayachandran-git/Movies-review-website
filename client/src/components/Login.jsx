import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import "./Login.css"
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        await login(email, password);
        alert('Login succesfully')
        navigate('/')
    }  catch(error) {
      alert('Invalid credentials! Email or password is incorrect')
    }
 
  };


  return (
   
    <Container className='register-container'>
      
      <Form className='form' onSubmit={handleSubmit}>
      <h2 className='h2'>Login</h2>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button className='btn1' variant="success" type="submit">Submit</Button> <br/>
      <p className='p'> Don't have an account?</p>
      <Link to="/register"><Button className='btn' variant="primary">Register</Button></Link>
     </Form>
    </Container>
    
  );
};

export default Login;
