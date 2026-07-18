// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCghBUhwDl_LVInAqmg-V4VDLhAZEVmssk",
  authDomain: "gaus-tech-order-dashboard.firebaseapp.com",
  projectId: "gaus-tech-order-dashboard",
  storageBucket: "gaus-tech-order-dashboard.firebasestorage.app",
  messagingSenderId: "930890426515",
  appId: "1:930890426515:web:78be4361e57ba9300d0566"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);