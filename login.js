import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC1LY605syjchSrTiGZwc7moltzFv5FVwY",
  authDomain: "dairymuchh.firebaseapp.com",
  databaseURL: "https://dairymuchh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dairymuchh",
  storageBucket: "dairymuchh.firebasestorage.app",
  messagingSenderId: "428241956537",
  appId: "1:428241956537:web:c481951b3075df27c37568",
  measurementId: "G-VGQVHJ1J5F"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Login functionality
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("Please enter email and password.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "./dashboard.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});




// Forgot Password functionality
document.getElementById("forgotPasswordLink").addEventListener("click", () => {
  const email = prompt("Enter your registered email to reset your password:");
  if (email) {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent. Check your inbox!");
      })
      .catch((error) => {
        alert("Error: " + error.message);
      });
  }
});


// Show/Hide Password in Login (with eye toggle inside input box)
document.addEventListener('DOMContentLoaded', () => {
    const togglePassword = document.getElementById('toggleLoginPassword');
    const passwordInput = document.getElementById('loginPassword');
  
    if (togglePassword && passwordInput) {
      togglePassword.addEventListener('click', () => {
        // Toggle the type attribute
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
  
        // Toggle the eye / eye-slash icon
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
      });
    } else {
      console.warn('Password toggle elements not found.');
    }
  });


  document.addEventListener("DOMContentLoaded", () => {
    // Clear login fields
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";
  
    // Clear signup fields
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("confirmPassword").value = "";
  
    // Clear any password match message
    const message = document.getElementById("matchMessage");
    if (message) message.textContent = "";
  });
  
