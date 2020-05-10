import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "../config";

class ApiService {
  constructor(firebaseConfig) {
    this.fb = firebase.initializeApp(firebaseConfig);
  }

  fetchEvents = () =>
    this.fb.firestore().collection("events").get().then(processFbCollection);

  signUp = (email, password) =>
    this.fb.auth().createUserWithEmailAndPassword(email, password);

  onAuthChange = (callback) => this.fb.auth().onAuthStateChanged(callback);
}

function processFbCollection(collection) {
  return collection.docs.map((snapshot) => ({
    ...snapshot.data(),
    id: snapshot.id,
  }));
}

export default new ApiService(firebaseConfig);
