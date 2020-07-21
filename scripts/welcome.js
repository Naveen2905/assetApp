var mainApp = {}

$(function () {
    var firebase = app_firebase;
    var uid = null
    firebase.auth().onAuthStateChanged(function (user) {
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid, emailVerified;

        if (user != null) {
            name = user.displayName;
            email = user.email;
            photoUrl = user.photoURL;
            emailVerified = user.emailVerified;
            uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
            // this value to authenticate with your backend server, if
            // you have one. Use User.getToken() instead.
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                $('.userName').html(profile.displayName)
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
                $('.userPhoto').append(`<img class='image' src="${profile.photoURL}" alt="${profile.displayName} Image">`)
            });
        }
        else {
            uid = null
            window.location.replace('index.html')
        }
    });
    function logOut() {
        firebase.auth().signOut()
    }

    mainApp.logOut = logOut;
});