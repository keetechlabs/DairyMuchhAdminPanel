import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-functions.js";

const firebaseConfig = {
  apiKey: "AIzaSyC1LY605syjchSrTiGZwc7moltzFv5FVwY",
  authDomain: "dairymuchh.firebaseapp.com",
  databaseURL: "https://dairymuchh-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "dairymuchh",
  storageBucket: "dairymuchh.appspot.com",
  messagingSenderId: "428241956537",
  appId: "1:428241956537:web:c481951b3075df27c37568"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, "asia-southeast1"); // ✅ region

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
  if (confirm("Are you sure you want to log out?")) {
    signOut(auth).then(() => {
      alert("Logged out successfully!");
      window.location.href = "./login.html";
    }).catch((error) => {
      console.log("Error logging out: " + error.message);
    });
  }
});

// Notification logic
const sendNotificationBtn = document.getElementById("sendNotificationBtn");

sendNotificationBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value;
  const message = document.getElementById("message").value;

  if (!title || !message) {
    alert("Please provide both title and message.");
    return;
  }

  try {
    const sendNotification = httpsCallable(functions, 'sendAdminNotification');
    const result = await sendNotification({ title, message });

    if (result.data.success) {
      alert("Notification sent successfully!");
    } else {
      alert("Notification failed to send.");
    }
  } catch (error) {
    console.error("Error sending notification:", error);
    alert("Error occurred while sending the notification.");
  }
});

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
