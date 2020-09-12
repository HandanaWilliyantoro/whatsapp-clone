import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyB85pTf6bvlsItDm51mKgLkCV4lhKP8438",
    authDomain: "handana-whatsapp-clone.firebaseapp.com",
    databaseURL: "https://handana-whatsapp-clone.firebaseio.com",
    projectId: "handana-whatsapp-clone",
    storageBucket: "handana-whatsapp-clone.appspot.com",
    messagingSenderId: "229883530706",
    appId: "1:229883530706:web:89c66a98d48a4931478c0b"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db