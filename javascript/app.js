var config = {
    apiKey: "AIzaSyA-EK5tTM--mUPWdbzCPDUTs2O8VFYhS_k",
    authDomain: "firstapp-34ecd.firebaseapp.com",
    databaseURL: "https://firstapp-34ecd.firebaseio.com",
    projectId: "firstapp-34ecd",
    storageBucket: "firstapp-34ecd.appspot.com",
    messagingSenderId: "594034273762"
  };
  firebase.initializeApp(config);

  database = firebase.database();

//Submit button on push.

$("#submit").on("click", function(event){
    event.preventDefault();
    var name = $("#nameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val().trim();
    var firstTrain = $("#firsttrainInput").val().trim();
    
    var newTrain = {
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.firstTrain);
});

database.ref().on("child_added", function(childSnapshot) {    

console.log(childSnapshot.val());

var newRecord=childSnapshot.val();
var frequency = newRecord.frequency;
var firstTrain = newRecord.firstTrain;

var timeNow = new Date()
var timeNowHr = timeNow.getHours();
var timeNowMin = timeNow.getMinutes();
var timeNowTotal = (timeNowHr*60)+timeNowMin;

var firsthours = firstTrain[0] + firstTrain[1];
firsthours = parseInt(firsthours)
var firstminutes = firstTrain[2] + firstTrain[3];
firstminutes = parseInt(firstminutes)
var firstTotal = (firsthours*60)+firstminutes;

var difference = timeNowTotal - firstTotal;
frequency = parseInt(frequency);

// Reminder 
var timeSinceArrival = difference % frequency;
var timeUntilArrival 
if (timeSinceArrival !=0){
timeUntilArrival = frequency - timeSinceArrival;
}
else{
    timeUntilArrival = 0;
}
var minutes = timeUntilArrival;
var Newtime = timeNowTotal + minutes;
if (Newtime >= 1440){
    Newtime = Newtime - 1440;
}
var NewHour = Math.floor(Newtime / 60);
    if (NewHour == 0){
        NewHour = 12
    }
    NewMinutes =  Newtime % 60;
    if (NewMinutes < 10){
        NewMinutes = "0" + NewMinutes;
    }
var nextTrainArrival = NewHour + ":"+ NewMinutes
if ( NewHour <= 12){
    nextTrainArrival = NewHour + ":"+ NewMinutes + " AM"
}else{
    NewHour = NewHour - 12;
    nextTrainArrival = NewHour + ":"+ NewMinutes + " PM"
}

$("tbody").append("<tr><td>"+newRecord.name+"</td><td>"+newRecord.destination+"</td><td>"+newRecord.frequency+"</td><td>"+nextTrainArrival+"</td><td>"+minutes+"</td></tr>")
});
// Reload 
setTimeout(function(){ location.reload(); }, 60000);