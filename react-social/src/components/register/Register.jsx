import './register.css'
import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  

  const handelSubmit = async (event)=>{
    event.preventDefault();
    
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity('Password does not match')
    }
    else{
      const newUser = {
        username:username.current.value, 
        email:email.current.value, 
        password:password.current.value
      }
      try{
        await axios.post('http://localhost:8800/api/auth/register',newUser)
        navigate('/login');
      }
      catch(error){
        console.log(error)
      }
    }
  }

  const handleClick = ()=>{
    navigate("/login")
  }
  
  return (
    <div className='register'>
        <div className='register_div'>
        <div className='register_left'>
            <h1 className='register_logoTitle'>H! Buddies</h1>
            <span className='register_tagline'>Let's connect to your friends and loved ones!</span>
        </div>
        <form className='register_right' onSubmit={handelSubmit}>
          <input 
            placeholder='Username' 
            className='register_username' 
            ref = {username}
            required
            >
          </input>

          <input 
            placeholder='Email' 
            className='register_inputEmail'
            type='email'
            ref ={email}
            required
            >
          </input>

          <input 
            placeholder='Password' 
            className='register_inputPassword'
            type='password'
            minLength='6'
            ref={password}
            required
            >
          </input>

          <input 
            placeholder='Password Again' 
            className='register_inputPassword'
            type='password'
            minLength='6'
            ref={passwordAgain}
            required
            >
          </input>

          <button className='signUp_button' type='submit'>Sign Up</button>
          <button className='register_loginButton' onClick={handleClick}>Login</button>
        </form>
        </div>
        
    
    </div>
  )
}

export default Register