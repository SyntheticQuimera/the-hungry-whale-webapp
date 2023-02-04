import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQdgWuEKs6hxCnMc6zPgzlrXNVy2ikB1Q",
  authDomain: "the-hungry-whale-webapp.firebaseapp.com",
  databaseURL: "https://the-hungry-whale-webapp-default-rtdb.firebaseio.com",
  projectId: "the-hungry-whale-webapp",
  storageBucket: "the-hungry-whale-webapp.appspot.com",
  messagingSenderId: "568895670939",
  appId: "1:568895670939:web:8b1803185f280e3b04943e",
  // apiKey:REACT_FIREBASE_API_KEY,
  // authDomain: REACT_FIREBASE_AUTH_DOMAIN,
  // databaseURL: REACT_FIREBASE_DATABASE_URL,
  // projectId: REACT_FIREBASE_PROJECT_ID,
  // storageBucket: REACT_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: REACT_FIREBASE_MESSAGING_ID,
  // appId: REACT_FIREBASE_APP_ID
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
