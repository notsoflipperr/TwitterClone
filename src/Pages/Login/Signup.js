import React, { useState } from 'react';
import twitterImg from '../../assets/Frontpage.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import  axios  from 'axios';
const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [signInWithGoogle, googleUser ] = useSignInWithGoogle(auth)


    const handleSubmit = e => {
        e.preventDefault();
        createUserWithEmailAndPassword(email, password)

        const user = {
            username: username,
            name: name,
            email: email,
            phonenumber: phonenumber
        }

        axios.post('http://localhost:5000/register', user)
        
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    
    if(user){
        navigate('/')
        console.log(user.phonenumber)
    }
    if(googleUser){
        navigate('/')
        console.log(googleUser)
    }
    if(error){
        console.log(error.message)
    }
    if(loading){
        console.log('loading.....')
    }


    return (
        <div className='login-container'>
            <div className="image-container">
                <img className='image' src= { twitterImg }   alt="" />
            </div>
            <div className="form-container">
            
                <div className='form-box'>
                <TwitterIcon className='Twitter-img' />
                    <h3 className='Sheading'>Happening Now</h3>
                    <h4 className='Sheading1'>Join Twitter Today.</h4>
                    <form className='' onSubmit={ handleSubmit }>
                        <input 
                        type="text"
                        classname='display-name'
                        placeholder='Username'
                        onChange={(e) => setUserName(e.target.value)}
                        />
                        <input 
                        type="text"
                        className='display-name'
                        placeholder='Enter full name'
                        onChange={(e) => setName(e.target.value)}
                        />
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
                        <input 
                        type="text"
                        className='phonenumber'
                        placeholder='Phone Number'
                        onChange={(e) => setPhoneNumber(e.target.value)} 
                        />
                        <div className="btn-Login">
                            <button type='submit' className='btn'>Sign Up</button>
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
                        Already have an account?
                        <Link 
                        to='/Login'
                        style={{
                            textDecoration: 'none',
                            color: 'skyblue',
                            fontWeight: '600',
                            marginLeft: '5px'
                        }}
                        >
                        Login
                        </Link>
                    </ div>
                </div>
            </div>
        </div>
    );
};

export default Signup;