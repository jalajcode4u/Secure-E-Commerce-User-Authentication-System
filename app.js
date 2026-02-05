// 🔹 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { 
  getFirestore,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// 🔹 Firebase config (YOUR PROJECT)
const firebaseConfig = {
  apiKey: "AIzaSyBodhjSppBNq7XLEdS-AZySsylrBQxTlQI",
  authDomain: "dummy-flipkart-f2122.firebaseapp.com",
  projectId: "dummy-flipkart-f2122",
  storageBucket: "dummy-flipkart-f2122.firebasestorage.app",
  messagingSenderId: "261914706461",
  appId: "1:261914706461:web:e6f04a09edd1b8a82e3cf4"
};

// 🔹 Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 DOM
const email = document.getElementById("email");
const password = document.getElementById("password");
const msg = document.getElementById("msg");
const logoutBtn = document.getElementById("logoutBtn");

// 🔹 SIGN UP
document.getElementById("signupBtn").addEventListener("click", async () => {
  try {
    const cred = await createUserWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    await setDoc(doc(db, "users", cred.user.uid), {
      email: cred.user.email,
      createdAt: new Date()
    });

    msg.innerText = "Signup successful 🎉";
  } catch (err) {
    msg.innerText = err.message;
  }
});

// 🔹 LOGIN
document.getElementById("loginBtn").addEventListener("click", async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    msg.innerText = "Login successful ✅";
  } catch (err) {
    msg.innerText = err.message;
  }
});

// 🔹 LOGOUT
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  msg.innerText = "Logged out 👋";
});

// 🔹 AUTH STATE LISTENER
onAuthStateChanged(auth, (user) => {
  if (user) {
    logoutBtn.style.display = "block";
    msg.innerText = `Welcome ${user.email}`;
  } else {
    logoutBtn.style.display = "none";
  }
});
