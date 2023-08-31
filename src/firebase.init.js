
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyApxD7_x5eTPYVE68c6pPiK5HN4eaMkfu8",
  authDomain: "twitterclone-a2c2f.firebaseapp.com",
  projectId: "twitterclone-a2c2f",
  storageBucket: "twitterclone-a2c2f.appspot.com",
  messagingSenderId: "119384032427",
  appId: "1:119384032427:web:8105c7342a9b71afa4a3ee",
  measurementId: "G-BJVNHM3QS0"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export default auth;
