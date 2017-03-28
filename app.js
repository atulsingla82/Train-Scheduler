$(document).ready(function() {

    // Initialize Firebase

    var config = {
        apiKey: "AIzaSyDlW42KW_Jlc4LubsYUq_ADZNxTp8ZvNpg",
        authDomain: "train-scheduler-61329.firebaseapp.com",
        databaseURL: "https://train-scheduler-61329.firebaseio.com",
        storageBucket: "train-scheduler-61329.appspot.com",
        messagingSenderId: "300840264192"
    };
    firebase.initializeApp(config);

    var database = firebase.database();


    // =========================================================

    // On click Button to add train info.

    $("#runSubmit").on("click", function() {
        event.preventDefault();

        // Grab user Input

        var trainName = $("#trainName-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = $("#firstTrain-input").val().trim();
        var frequency = $("#frequency-input").val().trim();

        //========== Calculations ============//

        // Assumption
        var firstTrain = "3:30";

        //First time converted (pushed back one year to make sure it comes before current time)
       var firstTrainConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
        console.log(firstTrainConverted);

        //Current Time
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

        //Difference between the times
        var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);

        // Time Apart (remainder)
        var tRemainder = diffTime % frequency;
        console.log(tRemainder);

        // Minutes until train
        var minUntilTrain = frequency - tRemainder;
        console.log("MINUTES UNTIL TRAIN: " + minUntilTrain);

        // Next Train
        var nextTrain = moment().add(minUntilTrain, "minutes").format("hh:mm");
        console.log("ARRIVAL TIME :" + moment(nextTrain).format("hh:mm"));


        var newTrain = {

            name: trainName,
            destination: trainDestination,
            first: firstTrain,
            frequency: frequency,
            min: minUntilTrain,
            next: nextTrain

        }
        console.log(newTrain);

        database.ref().push(newTrain);

        

    });


//===============================================================  

    database.ref().on("child_added", function(childSnapshot) {
        var name = childSnapshot.val().name;
        var destination = childSnapshot.val().destination;
        var firstTrain = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
        var min = childSnapshot.val().min;
        var next = childSnapshot.val().next;

        $("#trainTable > tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next + "</td><td>" + min + "</td></tr>");

    });


    
    database.ref().orderByChild("trainName").limitToLast(1).on("value",function(Snapshot) {
     
     console.log(Snapshot.val());

     $("#trainName-display").html(Snapshot.val().trainName);
      
      

  });

}); // Closing for document.ready
