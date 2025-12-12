import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBcV54-LEs1tsXocoqK2Bj98SkF0xEPi1o",
  authDomain: "letter-bookpt.firebaseapp.com",
  projectId: "letter-bookpt",
  storageBucket: "letter-bookpt.firebasestorage.app",
  messagingSenderId: "142200972700",
  appId: "1:142200972700:web:275ad4ebaeeec779df9459",
  measurementId: "G-9VKTZMPX0E"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;

if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };