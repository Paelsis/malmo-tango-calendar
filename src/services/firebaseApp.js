import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCniLg3N-jF1DQava7qoeUZmvX5a-3rwbY",
  authDomain: "malmo-tango-calendar.firebaseapp.com",
  projectId: "malmo-tango-calendar",
  storageBucket: "malmo-tango-calendar.appspot.com",
  messagingSenderId: "45243718639",
  appId: "1:45243718639:web:b2a86d254ba5db84ddf41a"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export default app