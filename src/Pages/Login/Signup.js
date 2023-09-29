import React, { useState } from 'react';
import twitterImg from '../../assets/Frontpage.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import GoogleButton from 'react-google-button';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import  axios  from 'axios';
import { PhoneAuthProvider, RecaptchaVerifier } from 'firebase/auth';
import firebase from '../../firebase';
const Signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [verificationId, setVerificationId] = useState(null);

    const navigate = useNavigate();

    const configureCaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
          'size': 'invisible',
          'callback': (response) => {
            console.log("ReCaptcha Verified")
          },
          defaultCountry : "IN"
        });
    }
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const [signInWithGoogle, googleUser ] = useSignInWithGoogle(auth)


    const handleSubmit = async (e) => {
        e.preventDefault();
        let flag = false;

        await axios.get('https://twitter-clone-f5od.onrender.com/loggedInUser?email=' + email)
            .then(res => res.data)
            .then(data => {
                if(data.length > 0) {
                    console.log("email already exists");
                    flag = true;
                }
            })

        await axios.get('https://twitter-clone-f5od.onrender.com/getPhone?phonenumber=' + phonenumber)
            .then(res => res.data)
            .then(data => {
                if(data.length > 0) {
                    console.log("phonenumber already exists");
                    flag = true;
                }
            })

        

        if(flag)
            return;

        const user = {
            username: username,
            name: name,
            email: email,
            phonenumber: phonenumber
        }
        console.log("reach");
        try {        
            await createUserWithEmailAndPassword(email, password);
            const user = firebase.auth().currentUser;
            const phoneCredential = firebase.auth.PhoneAuthProvider.credential(
                verificationId,
                otp
            );
            await user.linkWithCredential(phoneCredential);
            
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        axios.post('https://twitter-clone-f5od.onrender.com/register', user);
    }
    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }

    
    const sendOTP = async () => {
        try {
            const phoneProvider = new firebase.auth.PhoneAuthProvider(auth);
            const verifier = new firebase.auth.RecaptchaVerifier(
                'recaptcha-container',
                { 
                    size: 'invisible',
                    defaultCountry : "IN"
                }
            )

            const verificationId = await phoneProvider.verifyPhoneNumber(
              "+91" + phonenumber,
              verifier
            );
            setVerificationId(verificationId);
            setOtpSent(true);
            console.log('OTP sent successfully');
          } catch (error) {
            console.error('Error sending OTP:', error);
          }
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
                        <div id="sign-in-button"></div>
                        {
                            otpSent ?
                            <input 
                                type="text"
                                className='phonenumber'
                                placeholder='OTP'
                                onChange={(e) => setOtp(e.target.value)} 
                            /> : 
                            <div className="btn-Login" onClick={sendOTP} style={{width: "200px"}} >
                                <button type='button' className='btn'>Send OTP</button>
                            </div>
                        }
                        
                        <div id="recaptcha-container"></div>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;