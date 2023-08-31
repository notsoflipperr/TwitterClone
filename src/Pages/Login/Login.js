import React, { useState } from 'react';
import twitterImg from '../../assets/Frontpage.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import './Login.css';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [errorMessage, setError] = useState('');

    const navigate = useNavigate();

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser] = useSignInWithGoogle(auth);

    if(user || googleUser){
        navigate('/')
        console.log(user)
        console.log(googleUser)
    }
    if(error){
        console.log(error.message)
    }
    if(loading){
        console.log('loading.....')
    }
    const handleSubmit = e => {
        e.preventDefault();
        console.log(email, password);
        signInWithEmailAndPassword(email, password)
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    
    return (
        <div className='login-container'>
            <div className="image-container">
                <img className='image1' src= { twitterImg }   alt="" />
            </div>
            <div className="form-container">
                
                <div className='form-box1'>
                  <TwitterIcon className='Twitter-img' />
                    <h1 className='heading'>Login</h1>
                    
                    <form className='' onSubmit={ handleSubmit }>
                        <input 
                        type="email"
                        className='email'
                        placeholder='Email Address'
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                        type="password"
                        className='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} 
                        />
                        <div className="btn-Login">
                            <button type='submit' className='btn'>Login</button>
                        </div>
                    </form>
                    <hr />
                    <div className='google-button'>
                        <GoogleButton 
                        className='g-btn'
                        type='light'
                        onClick={handleGoogleSignIn}
                        />
                    </div>
                    <div>
                        Don't have an account?
                        <Link 
                        to='/Signup'
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                        >
                        Signup 
                        </Link>
                    </div>
                   
                    Or
                    <div>
                        Login using
                        <Link 
                        to='/PhoneNumber'
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                        >
                        Phone Number
                        </Link>
                    </div>
                </div>
            </div>
            </div>
        
    );
};

export default Login;