import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBOJiXkR5pnsusKIlr8C9EUec2Ym3WWxTY",
    authDomain: "tv-show-superlatives.firebaseapp.com",
    databaseURL: "https://tv-show-superlatives.firebaseio.com",
    projectId: "tv-show-superlatives",
    storageBucket: "tv-show-superlatives.appspot.com",
    messagingSenderId: "442471026350",
    appId: "1:442471026350:web:5cebbc38920e33a19c673f"
};

firebase.initializeApp(firebaseConfig);

export default firebase;