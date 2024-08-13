import React, { useState } from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import './Register.css'
import {Link, useNavigate} from 'react-router-dom'
import { useAuth } from '../context/AuthContext';



const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const { register } = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        await register(name, email, password);
        alert('Account created succesfully')
        navigate('/login')
      }catch (error) {  
        alert('Invalid data')
      }
     
    };
  

  return (

   <Container className='register-container'>
      
      <Form className='form' onSubmit={handleSubmit}>
      <h2 className='h2'>Register</h2>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button className='btn1' variant="success" type="submit">Submit</Button><br/>
       <p className='p'>Already have an account?</p>
      <Link to="/login"><Button className='btn' variant="primary">Login</Button></Link>
     </Form>
    </Container>
  );
}

export default Register;

