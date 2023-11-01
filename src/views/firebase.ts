import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

//*정보변경
const firebaseConfig = {
  apiKey: "AIzaSyD_nuephko54ptmdGiex4_P3AWqAZ5K644",
  authDomain: "react-hompage.firebaseapp.com",
  projectId: "react-hompage",
  storageBucket: "react-hompage.appspot.com",
  messagingSenderId: "268998133822",
  appId: "1:268998133822:web:54566ca3e2074d5b93e96f",
  measurementId: "G-8T962FJ706"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
