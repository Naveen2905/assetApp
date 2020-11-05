var app_firebase = {}

$(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyCirKRHqafcdwI7r5zwcQBgSUREfbhwmWc",
        authDomain: "assettrackingapp-7b9fb.firebaseapp.com",
        databaseURL: "https://assettrackingapp-7b9fb.firebaseio.com",
        projectId: "assettrackingapp-7b9fb",
        storageBucket: "assettrackingapp-7b9fb.appspot.com",
        messagingSenderId: "724226181612",
        appId: "1:724226181612:web:f58486869279706e04d8c9"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
});