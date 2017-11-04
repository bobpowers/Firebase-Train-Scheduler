



$(document).ready(function(){
	// var newTime = moment("0134").format('LT');
	// console.log(newTime);
	// Firebase Key
	var config = {
	    apiKey: "AIzaSyChDeYkBtnTZ2pun6IaLUDFMWVWaQw9PhM",
	    authDomain: "fbtrainscheduler.firebaseapp.com",
	    databaseURL: "https://fbtrainscheduler.firebaseio.com",
	    projectId: "fbtrainscheduler",
	    storageBucket: "",
	    messagingSenderId: "690034397789"
	  };
	firebase.initializeApp(config);
	var database = firebase.database();


	
	
// Display Clock at Top of Page
	var pageTime;
	var updateClock = function() {
		var runningClock = function(){
			pageTime = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
			$("#displayTime").text(pageTime);
		}
      setInterval(runningClock, 1000);
    }
    updateClock();
// END Display Clock

	// SUBMIT input to Firebase
	$("#submitButton").on("click", function(){
		event.preventDefault();
		var tName = $("#trainInput").val().trim();
		var tDestination = $("#destinationInput").val().trim();
		var tFrequency = $("#frequencyInput").val().trim();
		var tStart = $("#arrivalInput").val().trim();

		// var replaced = tStart.replace(/:/g, '');
		// var newTime = moment("0134").format('LT');
		// var newTime = moment(replaced, "h hh");
		// console.log(newTime);
		// var currentTrain = departureMoment.format('HH:mm');

		database.ref().push({
	        train: tName,
	        destination: tDestination,
	        frequency: tFrequency,
	        start: tStart
	      });
		// Clear form fields
		$("#trainInput").val("");
		$("#destinationInput").val("");
		$("#frequencyInput").val("");
		$("#arrivalInput").val("");
	}); // End Submit Button Event

	// Retrieve data from Firebase and add to page
	database.ref().orderByChild("start").on("child_added", function(snapshot) {
		var tName = snapshot.val().train;
		var tDestination = snapshot.val().destination;
		var tFrequency = snapshot.val().frequency;
		var tStart = snapshot.val().start;

		var currentTime = moment();
		var minutesAway = tStart - 

		var addTr = $("<tr>");
		addTr.append("<td>"+tName+"<td>"+tDestination+"<td>"+tFrequency+"<td>"+tStart+"<td>"+minutesAway);
		$("#tableBody").append(addTr);
	});







}); // END DOCUMENT READY