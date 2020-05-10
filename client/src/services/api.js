import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "../config";

class ApiService {
  constructor(firebaseConfig) {
    this.fb = firebase.initializeApp(firebaseConfig);
  }

  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password);

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback);
}

export default new ApiService(firebaseConfig);
