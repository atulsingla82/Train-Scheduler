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

    $("#runSubmit").on("click", function(event) {
        event.preventDefault();

        // Grab user Input

        var trainName = $("#trainName-input").val().trim();
        var trainDestination = $("#destination-input").val().trim();
        var firstTrain = $("#firstTrain-input").val().trim();
        var trainFrequency = $("#frequency-input").val().trim();

       //========== Calculations ============//
  

     //Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


      var minUntilTrain = 0;
      var nextTrain = 0;


        var newTrain = {
            name: trainName,
            destination: trainDestination,
            first: firstTrain,
            frequency: trainFrequency,
            min : minUntilTrain,
            next : nextTrain

        };

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

   



    

        



}); // Closing for document.ready
