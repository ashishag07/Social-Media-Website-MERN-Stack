import './login.css'
import { useRef,useContext } from 'react'
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';


function Login() {
  const email = useRef();
  const password = useRef();
  const {isFetching,dispatch} = useContext(AuthContext);
  const navigate = useNavigate();
 

  const handleClick = (event)=>{
    event.preventDefault()
    loginCall({email:email.current.value,password:password.current.value},dispatch)
  }

  const handleRegisterClick =()=>{
    navigate('/')
  }

  return (
    <div className='login'>
        <div className='login_div'>
        <div className='login_left'>
            <h1 className='login_logoTitle'>H! Buddies</h1>
            <span className='login_tagline'>Let's connect to your friends and loved ones!</span>
        </div>
        
          <form className='login_right' onSubmit={handleClick}>
            <input             
              placeholder='Email' 
              type='email'
              required 
              className='login_inputEmail' 
              ref={email}>
            </input>

            <input 
              placeholder='Password' 
              type='password'
              required
              className='login_inputPassword'
              ref={password}>              
            </input>

            <button className='login_button'>{isFetching
              ?<CircularProgress color = "inherit" size='20px'/>
              :"Login"}
            </button>
            <span className='login_forgotPassword'>Forgot Password?"</span>
            <button className='register_button' onClick={handleRegisterClick}>{isFetching
              ?<CircularProgress color = "inherit" size='20px'/>
              :"Create New Account"}
            </button>
          </form>
        </div>
        
    
    </div>
  )
}

export default Login