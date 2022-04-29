import firebase from 'firebase'
import 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyC3nkm7ODWNgzwunY9NZ7SpmTtNmzbdOdI",
  authDomain: "university-7fa53.firebaseapp.com",
  projectId: "university-7fa53",
  storageBucket: "university-7fa53.appspot.com",
  messagingSenderId: "929648584115",
  appId: "1:929648584115:web:a9b4a71f12c5cbae2597c6",
  measurementId: "G-N5CL8M7D05"
  };
  
  firebase.initializeApp(firebaseConfig)
  export {firebase}