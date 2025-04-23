import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

// Firebase config (reuse your config here)
const firebaseConfig = {
  apiKey: "AIzaSyC1LY605syjchSrTiGZwc7moltzFv5FVwY",
  authDomain: "dairymuchh.firebaseapp.com",
  databaseURL: "https://dairymuchh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dairymuchh",
  storageBucket: "dairymuchh.firebasestorage.app",
  messagingSenderId: "428241956537",
  appId: "1:428241956537:web:c481951b3075df27c37568",
  measurementId: "G-VGQVHJ1J5F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Sidebar navigation logic
const navItems = document.querySelectorAll('.nav-item[data-target]');
const sections = document.querySelectorAll('.section');

// Loop through the navigation items to add the click event
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const target = item.getAttribute('data-target');
    
    // Remove 'active' class from all sections and nav items
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(i => i.classList.remove('active'));

    // Add 'active' class to the clicked nav item and the corresponding section
    item.classList.add('active');
    const section = document.getElementById(target);
    if (section) section.classList.add('active');
  });
});

// Logout logic with Firebase Auth
document.getElementById("logoutBtn").addEventListener("click", () => {
  // Show confirmation dialog
  const confirmLogout = confirm("Are you sure you want to log out?");
  
  // If the user clicks "OK" (confirmLogout is true), log them out from Firebase
  if (confirmLogout) {
    signOut(auth).then(() => {
      // Logout successful, show the alert
      alert("Logged out successfully!");
      // Redirect to login page
      window.location.href = "./login.html";
    }).catch((error) => {
      // Handle sign-out errors
      console.log("Error logging out: " + error.message);
    });
  } else {
    // If the user clicks "Cancel", do nothing and close the alert
    console.log("Logout cancelled");
  }
});

