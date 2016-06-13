var http = require('http');
console.log('Got http object');
url = require('url');
console.log('Got url object');
var rpio = require('rpio');
console.log('Got GPIO object');
var Firebase = require('firebase');
rpio.open(3, rpio.OUTPUT, rpio.LOW);
console.log('Rpio started. LED is switched off');
rpio.sleep(3);
var tempF = new Firebase("https://aprenderx.firebaseio.com/userDetails");
//var tempsuplyDetails = new Firebase("https://aprenderx.firebaseio.com/suplyDetails");
//.auth('Xb7RLkpTctwg0XrFbbWGmHHsDQ8vQT8TqMxcxC9e');
//suplyDetails.push({})

//var pushedItem = tempF.push();
//pushedItem.set({name:'asd',flatnumber:'21',status:true,quota:10});
//pushedItem.child('suplyDetails').push({date:"09/07/2016",suplied:6,remaining:4});
tempF.once("value", function(snapshot){
	snapshot.forEach(function(firObj){
		var newRef = firObj.ref().child('suplyDetails');			
		newRef.push({date:"10/07/2016",suplied:6,remaining:4});		
	})
})














//, function(snapshot){
	//console.log(snapshot);
	//var childSnap = snapshot.child('suplyDetails');
	//childSnap.push({date:"09/07/2016",suplied:6,remaining:4});
//});

//for(index = 0; index < 5; index++)
//{
//	rpio.write(3, rpio.HIGH);
////	console.log('LED ON');
//	rpio.sleep(1);
//	rpio.write(3, rpio.LOW);
//	console.log('LED OFF');
//	rpio.sleep(1);
//	
//}
