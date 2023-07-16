import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase.js';
import './style.scss';

const Login = () => {
  const navigate = useNavigate();
  const [err,setErr] = useState(false);
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
   
    //console.log(username, email, password, file);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setErr(false);
      navigate("/");

    } catch (error) {
      setErr(true);
      console.log("error :  ",error.message);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Own Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handlerSubmit}>
            <input type="email" name="" placeholder="email"/>
            <input type="password" name=""  placeholder="password"/>
            <button>Login</button>
            {err && <p style={{color:"red"}}>User not found</p>}
        </form>
        <p>You don't have a account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login
