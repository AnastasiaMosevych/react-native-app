import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUlsVS3IrmKM4dyLwGgucMegCDgpvYS08",
  authDomain: "awesome-project-e3a6a.firebaseapp.com",
  projectId: "awesome-project-e3a6a",
  storageBucket: "awesome-project-e3a6a.appspot.com",
  messagingSenderId: "592198604846",
  appId: "1:592198604846:web:c5d7498cada5c07b3467bf"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);