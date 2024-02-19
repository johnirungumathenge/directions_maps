//create map

var mylatlng ={
    // lat:37.6456, lng:-0.0515
    lng:37.6456, lat:0.0515
};

var mapOptions ={
    center: mylatlng,
    zoom: 7,
    maptypeid: google.maps.MapTypeId.ROADMAP
}

var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

//create directions service object to use the route method
var directionsService = new google.maps.DirectionsService();

//create directions renderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the directions 
directionsDisplay.setMap(map);

// function
function calcRoute(){
    // create a request
    var request =  {
        origin: document.getElementById('from').value,
        destination: document.getElementById('to').value,
        travelMode:google.maps.TravelMode.DRIVING, // WALKING, BICYCLING, TRANSIT
        unitSystem: google.maps.UnitSystem.IMPERIAL,
    }

    // pass the request to the route method
    directionsService.route(request,(result,status) =>{
        if(status == google.maps.DirectionsStatus.OK) {
            // get distance and time
            const output = document.querySelector("#output");
            output.innerHTML = "<div class='alert alert-info'>From " + document.getElementById('from').value + ". <br> To: " + document.getElementById("to").value + ". <br> Driving Distance <i class='bi bi-sign-merge-left-fill'></i>: " +
            result.routes[0].legs[0].distance.text + ". <br>Duration <i class='bi bi-clock-fill'></i> : " + result.routes[0].legs[0].duration.text + ". </div>";

            //display the route
            directionsDisplay.setDirections(result);
        }
        else{
            // delete routes from map
            directionsDisplay.setDirections({routes: []});

            // center map
            map.setCenter(mylatlng);
            // show error message
            output.innerHTML = "<div class='alert-danger'> <i class='bi bi-exclamation-triangle-fill'></i> could not retrieve driving distance. </div>";
        }
    });
}

// create auto complete objects for all inputs
var options={
    types: ['(cities)']
}

var input1 = document.getElementById("from");

var autocomplete1 =new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 =new google.maps.places.Autocomplete(input2, options)