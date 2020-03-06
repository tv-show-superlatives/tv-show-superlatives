import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBb-jxZSNnD8SAtk2Iya1XGO61J7mA38Bg",
    authDomain: "tv-show-superlatives-database.firebaseapp.com",
    databaseURL: "https://tv-show-superlatives-database.firebaseio.com",
    projectId: "tv-show-superlatives-database",
    storageBucket: "tv-show-superlatives-database.appspot.com",
    messagingSenderId: "1029143500760",
    appId: "1:1029143500760:web:b168a46fad4f73e49a44ad"
};

firebase.initializeApp(firebaseConfig);

export default firebase;