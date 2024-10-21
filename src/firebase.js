import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyCb8A12phZ4w3AuVuatjstwcCa16Qq_dZo",
  authDomain: "portclaimchat.firebaseapp.com",
  databaseURL: "https://portclaimchat-default-rtdb.firebaseio.com",
  projectId: "portclaimchat",
  storageBucket: "portclaimchat.appspot.com",
  messagingSenderId: "266242079701",
  appId: "1:266242079701:web:547bc2f15d9a9655dc1b5c",
  measurementId: "G-8F3THZDYE7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app); // Initialize Firebase Auth
const storage = getStorage(app); // Initialize Firebase Storage

export { database, auth, storage }; // Export storage