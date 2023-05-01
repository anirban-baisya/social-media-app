// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-jwQHr0OvHYhuqOVww-ztzMSIoz991Mk",
  authDomain: "social-media-app-73cd1.firebaseapp.com",
  projectId: "social-media-app-73cd1",
  storageBucket: "social-media-app-73cd1.appspot.com",
  messagingSenderId: "223044291113",
  appId: "1:223044291113:web:8668c160a8183a99186a38"
};


// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const appCheck = initializeAppCheck(firebaseApp, {
//     provider: new ReCaptchaV3Provider(process.env.RECAPTCHA),
//     isTokenAutoRefreshEnabled: true,
//   });
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);
  
  export default getFirestore();