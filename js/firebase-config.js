// ===== FIREBASE CONFIGURATION =====
// Replace these values with your Firebase project config
// Go to: Firebase Console → Project Settings → General → Your Apps → Web App
const firebaseConfig = {
  apiKey: "AIzaSyCpRStd3cJuavDoB87i_6OLS7krIl8Kkvc",
  authDomain: "rivo-maps-82621.firebaseapp.com",
  projectId: "rivo-maps-82621",
  storageBucket: "rivo-maps-82621.firebasestorage.app",
  messagingSenderId: "637853454886",
  appId: "1:637853454886:web:deec1ee29aadbd22a7cce7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Auth Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();
