import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-functions.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";


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
const db = getDatabase(app);
const profilesContainer = document.getElementById("userProfilesContainer"); // ✅ Add this

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





async function loadUserProfiles() {
  try {
    const snapshot = await get(ref(db, 'Profile Details'));
    
    if (snapshot.exists()) {
      const users = snapshot.val();
      profilesContainer.innerHTML = ""; // ✅ Clears old data

      Object.keys(users).forEach(uid => {
        const user = users[uid];
        const card = document.createElement("div");
        card.className = "profile-card";

        card.innerHTML = `
          <h3>${user.fullName || "No Name"}</h3>
          <p><strong>Email:</strong> ${user.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${user.phoneNumber || "N/A"}</p>
          <p><strong>DOB:</strong> ${user.dob || "N/A"}</p>
          <p><strong>Wallet:</strong> ₹${user.walletBalance || 0}</p>
          <p><strong>Premium:</strong> ${user.premiumMember ? "Yes" : "No"}</p>
        `;

        profilesContainer.appendChild(card);
      });
    } else {
      profilesContainer.innerHTML = "<p>No user profiles found.</p>";
    }
  } catch (error) {
    console.error("Error loading user profiles:", error);
    profilesContainer.innerHTML = "<p>Failed to load profiles. Check console for details.</p>";
  }
}

// Call when the profile section is loaded (or on tab click)
document.querySelector('[data-target="profile"]').addEventListener("click", loadUserProfiles);
