var app_firebase = {}

$(function () {
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDM9x1_CskQ5v46ixNhVfsOyB6bvLpkS5M",
        authDomain: "asset-tracking-app-29783.firebaseapp.com",
        databaseURL: "https://asset-tracking-app-29783.firebaseio.com",
        projectId: "asset-tracking-app-29783",
        storageBucket: "asset-tracking-app-29783.appspot.com",
        messagingSenderId: "973877790467",
        appId: "1:973877790467:web:aeae67d018753d26504b36",
        measurementId: "G-NBV86DDVCB"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
});