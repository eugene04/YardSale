import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBwe4gKF5Udf2L2Nn_SrtTVesB26d6FbbI",
  authDomain: "baracuda-a5d9f.firebaseapp.com",
  databaseURL: "https://baracuda-a5d9f.firebaseio.com",
  projectId: "baracuda-a5d9f",
  storageBucket: "baracuda-a5d9f.appspot.com",
  messagingSenderId: "328142417731",
  appId: "1:328142417731:web:8c41d92bcad854c73a49f6",
  measurementId: "G-7WQPCC7F2F",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
