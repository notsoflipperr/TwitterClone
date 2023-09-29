import { React, useState, useEffect } from 'react';
import twitterImg from '../../assets/Frontpage.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import firebase from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import './Login.css';
// import { getAuth, RecaptchaVerifier } from "firebase/auth";

// class PhoneNumber extends React.Component {
const PhoneNumber = () => {

  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState([]);

  const navigate = useNavigate();
  const phonenumber = "+91" + ph ;
  // const email = "nsfw@gmail.com"
  // const name = "akif"
  // const username = "nsfw"

  useEffect(()=>{
    fetch(`https://twitter-clone-f5od.onrender.com/getPhone?phonenumber=${phonenumber}`)
    .then(res => res.json())
    .then(data => {
        setUser(data)
    })
}, [user, phonenumber])

  const PHhandleChange = (e) => {
    setPh(e.target.value);
  }
  const OTPhandleChange = (e) => {
    setOtp(e.target.value);
  }

  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
        console.log("ReCaptcha Verified")
      },
      defaultCountry : "IN"
    });

    console.log(user)
    
}

    const onSignInSubmit = (e) =>{
      e.preventDefault();
      // setLoading(true);
      configureCaptcha();
      
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phonenumber, appVerifier)
      .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      console.log('OTP has been sent');
      // setLoading(false);
      // setShowOTP(true);
      toast.success("OTP SENDED SUCCESSFULLY");
      // ...
    }).catch((error) => {
      console.log(error);
      // setLoading(false);
    });
}

    const onSubmitOTP = (e) => {
      e.preventDefault();
      // setLoading(true);
      const code = otp;
      console.log(code)
      window.confirmationResult.confirm(code).then((result) => {
        console.log(result);
        // setUser(result.user);
        console.log(JSON.stringify(result.user))
        // setLoading(false);
        navigate('/')

      }).catch((error) => {
        console.log(error);
        // setLoading(false);
      });
    }

  // const render(); {
  return (
    <div className='login-container'>
    <div className="image-container">
        <img className='image1' src= { twitterImg }   alt="" />
    </div>
    <div className="form-container">
        
        <div className='form-box1'>
          <TwitterIcon className='Twitter-img' />
            <h1 className='heading'>Login</h1>
            <br/><h4> Enter Mobile Number</h4>
          <>  <form onSubmit={onSignInSubmit}>
                  <div id="sign-in-button"></div>
                  <input type="number" className="number" value={ph} placeholder="Mobile number" required onChange={PHhandleChange}/>
                  <button type="submit">Submit</button>
                </form>

                <br/><h4>Enter OTP</h4>
                <form onSubmit={onSubmitOTP}>
                  <input type="number" className="code" value={otp} placeholder="OTP Number" required onChange={OTPhandleChange}/>
                  <button type="submit">Submit</button>
                </form>
            </>
            
            <div>
                 Phone not verifying? <br/>Try
                <Link 
                to='/Signup'
                style={{
                    textDecoration: 'none',
                    color: 'skyblue',
                    fontWeight: '600',
                    marginLeft: '5px'
                }}
                >
                Signing up 
                </Link> using your email
            </div>
        </div>
    </div>
    </div>
  );
  }


export default PhoneNumber;
