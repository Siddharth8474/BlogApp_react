import React,{useState} from 'react'
import axios from 'axios';
import './style/Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({onLogin}) => {

    const [username,setUserName]=useState('');
    const [password,setPassword]=useState('');

    const navigate=useNavigate()

    const handleChange=(event)=>{
       const {name,value}=event.target
       if(name === 'username'){
        setUserName(value)
       }

       if(name === 'password'){
        setPassword(value)
       }
    }


    const handleClick=()=>{
     axios.post('http://localhost:5000/login',{username,password})
     .then(response=>{
        alert(response.data.message)
        if(response.data.message){
        onLogin(response.data.userId) // Set userId in context
        navigate('/posts')
        }
     })
     .catch(error=>alert(error.message))
    }

  return (
    <div className='login-container'>

    <div className='login-card'>
        <h2>Login</h2>
      <input type='text' onChange={handleChange} name='username' placeholder='username' required className='login-input' />
      <input type='password' onChange={handleChange} name='password' placeholder='password' required className='login-input' />

      <button className='login-button' onClick={handleClick}>Login</button>
      <p>Dont have an account? <Link to='/register'>Register Here   </Link> </p>
    </div>

    </div>
  )
}

export default Login