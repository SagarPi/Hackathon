var firebase = require('firebase-admin');

var config = {
    apiKey: "AIzaSyBKRHoD7zk7STbQw-2J9zss7sZ6VAS_7wQ",
    authDomain: "water-measurement.firebaseapp.com",
    databaseURL: "https://water-measurement.firebaseio.com",
    projectId: "water-measurement",
    storageBucket: "water-measurement.appspot.com",
    messagingSenderId: "906568193586"
};

firebase.initializeApp(config);

var dbref = firebase.database().ref();      //try giving .ref(flatNum).push
var fs = require('fs');
var myApplicationRun = function () {
    var obj;
    fs.readFile('sensordata.json', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
    });
    var interval = 1000;
    var noOfReadingsPerMinute = 1000 / interval;
    var randomnum;
    var sensorData = 0;
    setInterval(doSomething, interval);
    function doSomething(params) {
        randomnum = Math.floor((Math.random() * 10) + 1);
        if (obj.SensorData[randomnum] != undefined) {
            currentReading = obj.SensorData[randomnum].Data;
            sensorData = parseInt(currentReading + sensorData);
            if (sensorData >= 1000) {
                SendDataToCloud(obj.FlatNo, sensorData, true);
                sensorData = 0;
            }
            console.log(" Total = " + sensorData + ", DATA = " + currentReading);
        }
    }
};

myApplicationRun();

var SendDataToCloud = function (flatNum, sensordata, status) {

    // console.log("flatNum = " + flatNum + ", sensordata = " + sensordata + ", status = " + status);


    //TODO: try doing reference for child node , without actually creating one.
    // var dbref = firebase.database().ref(flatNum);

    dbref.push({
        flatNum: flatNum,
        sensorData: sensordata,
        status: status
    });
}