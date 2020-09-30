import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'; 
import 'firebase/database';

const config = {
    apiKey: "AIzaSyArN-O1jDSIl833oCWgtYHMIQPPRw6-518",
    authDomain: "abyss-todo.firebaseapp.com",
    databaseURL: "https://abyss-todo.firebaseio.com",
    projectId: "abyss-todo",
    storageBucket: "abyss-todo.appspot.com",
    messagingSenderId: "13466386810",
    appId: "1:13466386810:web:50430a87f475fe76fe56c3"
};
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase; 