import React, { useState } from 'react';
 import axios from 'axios';
 import { Link } from 'react-router-dom';
 import './style/Registration.css';
 import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [username,setUserName]=useState('')
  const [password,setPassword]=useState('')

  const navigate = useNavigate();

  const handleChange=(event)=>{
    const {name , value} = event.target
    if(name === 'username'){
      setUserName(value)
    }

    if(name === 'password'){
      setPassword(value)
    }
  }


  const handleClick=()=>{
    console.log(username,password)

   axios.post('http://localhost:5000/register',{username,password})
   .then(response=>{
    alert(response.data.message)
    if(response.data.message){
      navigate('/login')
    }
  })
   .catch(error=>alert('registraion failed' + error.message))

  }

  return (  
    <div className='register-container'>
      <h2>Register</h2>
      <div className='register-form'>
        <input type='text' onChange={handleChange} placeholder='Username' name='username' required className='register-input' />
        <input type='password' onChange={handleChange} placeholder='Password' name='password' required className='register-input' />

        <button onClick={handleClick} className='register-button'>Register</button>

        <div className='link-container'>
       <Link to="/login" className='login-button'> Already have account? Login</Link>
       </div>

      </div>


    </div>
      );
};

export default Register;
