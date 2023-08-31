import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

var firebaseConfig = {
    apiKey: "AIzaSyApxD7_x5eTPYVE68c6pPiK5HN4eaMkfu8",
  authDomain: "twitterclone-a2c2f.firebaseapp.com",
  projectId: "twitterclone-a2c2f",
  storageBucket: "twitterclone-a2c2f.appspot.com",
  messagingSenderId: "119384032427",
  appId: "1:119384032427:web:8105c7342a9b71afa4a3ee",
  measurementId: "G-BJVNHM3QS0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
export default firebase