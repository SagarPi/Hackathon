var Firebase = require('firebase');
var tempF = new Firebase("https://aprenderx.firebaseio.com/userDetails");

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
})
