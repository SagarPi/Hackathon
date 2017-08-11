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
// var serviceAccount = require('serviceAccountKey.json');
// var tempF = new Firebase("https://aprenderx.firebaseio.com/userDetails");

// ********* to create new
//var pushedItem = tempF.push();
//pushedItem.set({name:'asd',flatnumber:21,status:true,quota:10});
//pushedItem.child('suplyDetails').push({date:"09/07/2016",suplied:6,remaining:4});

// ********* to push new
// tempF.once("value", function(snapshot){
// 	snapshot.forEach(function(firObj){
// 		var newRef = firObj.ref().child('suplyDetails');			
// 		newRef.push({date:"10/07/2016",suplied:6,remaining:4});		
// 	})
// 	console.log("suplydetails");
// 	return;
// })
/*
tempF.orderByChild('flatnumber').equalTo(21).once('value' , function(snapshot){
	var today = new Date();
	var todaysDate = today.toDateString();
	snapshot.forEach(function(firObj){
		if(firObj.child("suplyDetails").exists()){
			var datePresent;
			firObj.ref().child("suplyDetails").once('value' ,function(data){
				data.forEach(function(fdata){
					if(fdata.val()['date']==todaysDate){
						datePresent = fdata;
					}
				})
				if(datePresent){
					datePresent.ref().update({suplied:0});
				} else {
					data.ref().push({date:todaysDate,suplied:6});
				}
			})
		} else {
			var newRef = firObj.ref().child('suplyDetails');			
			newRef.push({date:todaysDate,suplied:6});	
		}
		// var snapshotVal = snapshot.val();
		// snapshot.update({status:false});
		// var newRef = snapshot.ref().child('suplyDetails');			
		// newRef.push({date:"10/07/2016",suplied:6});
	})
});
*/

// Initialize Firebase
// var config = {
//     apiKey: "AIzaSyBKRHoD7zk7STbQw-2J9zss7sZ6VAS_7wQ",
//     authDomain: "water-measurement.firebaseapp.com",
//     databaseURL: "https://water-measurement.firebaseio.com",
//     projectId: "water-measurement",
//     storageBucket: "",
//     messagingSenderId: "906568193586"
// };

var fs = require('fs');
var myApplicationRun = function() 
{
    var obj;
    fs.readFile('sensordata.json', function (err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
    });
    var interval = 1000;
    var noOfReadingsPerMinute = 1000/interval;
    var randomnum;
    var sensorData = 0;
          setInterval(doSomething, interval);
        function doSomething(params) {
            randomnum = Math.floor((Math.random() * 10) + 1);
            if(obj.SensorData[randomnum] != undefined)
            {
                currentReading = obj.SensorData[randomnum].Data;
                sensorData = parseInt(currentReading + sensorData);
                if(sensorData >= 1000)
                    {
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

    dbref.push({
        flatNum: flatNum,
        sensorData: sensordata,
        status: status
    });
}