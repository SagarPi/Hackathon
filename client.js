var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBKRHoD7zk7STbQw-2J9zss7sZ6VAS_7wQ",
    authDomain: "water-measurement.firebaseapp.com",
    databaseURL: "https://water-measurement.firebaseio.com",
    projectId: "water-measurement",
    storageBucket: "water-measurement.appspot.com",
    messagingSenderId: "906568193586"
};

firebase.initializeApp(config);

var dbref = firebase.database().ref();

dbref.on("child_added", function (snap) {
    console.log("Added : " + JSON.stringify(snap.val()))
})

dbref.on("child_changed", function (snap) {
    console.log("Changed : " + JSON.stringify(snap.val()))
})

dbref.on("child_removed", function (snap) {
    console.log("removed : " + JSON.stringify(snap.val()))
})