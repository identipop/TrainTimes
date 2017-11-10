  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDaABjiaXxuH5vA_f76vicO__0b7IqyqMU",
    authDomain: "train-schedule-65b87.firebaseapp.com",
    databaseURL: "https://train-schedule-65b87.firebaseio.com",
    projectId: "train-schedule-65b87",
    storageBucket: "train-schedule-65b87.appspot.com",
    messagingSenderId: "749451232382"
  };

firebase.initializeApp(config);

var database = firebase.database();

	
	$("#submit").click(function (event) {
		event.preventDefault();

		var name = $('#name').val().trim();
		var destination = $('#destination').val().trim();
		var freq = $('#freq').val().trim();
        var time = $('#time').val().trim();
        
        
		
        pushData(name, destination, freq, time);
        $('#name').val("");
		$('#destination').val("");
		$('#freq').val("");
       $('#time').val("");
	});

	function pushData (name, destination, freq, time){

		
		database.ref().push({
			name: name,
			destination: destination,
			freq: freq,
            time: time,	
            
           
				
		});

	};

	database.ref().on("child_added", function (childSnapshot) {

		var newRow = $('<tr>');

       var time = childSnapshot.val().time;
       var name = childSnapshot.val().name;
       var freq = childSnapshot.val().freq;
       var destination = childSnapshot.val().destination;

       var timeConverted = moment(time, "hh:mm").subtract(1, "years");

       var currentTime = moment();
       
       var currentTimeConverted = moment(currentTime).format("hh:mm");

       var diff = moment().diff(moment(timeConverted), "minutes");
      
       var remain = diff % freq;

       timeLeft = freq - remain;

       var newArrivalcalc = moment().add(timeLeft, 'm');
       var newArrivalDisplay = moment(newArrivalcalc).format("hh:mm");

		newRow.append('<td>' + childSnapshot.val().name + '</td>');
		newRow.append('<td>' + childSnapshot.val().destination + '</td>');
		newRow.append('<td>' + childSnapshot.val().freq + '</td>');
        newRow.append('<td>' + newArrivalDisplay + '</td>');
        
       
		newRow.append('<td>' +timeLeft + '</td>')
		
		$('#insert-data').append(newRow);
	}); 