import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD_VQolbC6SlwdCo2UjCOLsySs_RC4IVBc", 
    authDomain: "nexachat-auth.firebaseapp.com", 
    projectId: "nexachat-auth", 
    storageBucket: "nexachat-auth.appspot.com", 
    messagingSenderId: "1013681974037", 
    appId: "1:1013681974037:web:xxxxxx",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
