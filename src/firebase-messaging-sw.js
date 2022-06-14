importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js');
var firebaseConfig = {
    apiKey: "AIzaSyAFiRVStubJ-ll8BRqlD3jdRO2DaF-md7o",
    authDomain: "fitness-tracker-50a04.firebaseapp.com",
    projectId: "fitness-tracker-50a04",
    storageBucket: "fitness-tracker-50a04.appspot.com",
    messagingSenderId: "645880568562",
    appId: "1:645880568562:web:44485062bf986ed2f1ce6b",
    vapidKey: "BCKbGNtsTaDzTgrJLjT7xUC2Wm91yqW-iMfb96psNPEkgGAwTNNt6flZeTJoWPD9e5C2Y2l2nezru5drQ6HTpLo"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();