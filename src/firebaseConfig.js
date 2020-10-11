import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyDjCO-KTZxMea5cSHd1BI90e6K5y4gWB2Q",
  authDomain: "kz-vue3todo-firebase.firebaseapp.com",
  databaseURL: "https://kz-vue3todo-firebase.firebaseio.com",
  projectId: "kz-vue3todo-firebase",
  storageBucket: "kz-vue3todo-firebase.appspot.com",
  messagingSenderId: "815320079435",
  appId: "1:815320079435:web:4b1a10fa160213d5de41ce",
  measurementId: "G-SZB6WWS61T"
};

export default firebase.initializeApp(firebaseConfig);