// Splash Screen
const splash = document.querySelector('.splash')

document.addEventListener('DOMContentLoaded', e => {
	setTimeout(() => {
		splash.classList.add('display-none')
	}, 2000);
})


// Distance Calculator
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function distanceInMiles(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  d = d * 0.621371
  return d;
}


/* Search */

//ajax call
function post(url){
    return $.ajax({
        url: url,
        success: function(){
          //woop
        },
        error: function(desc, err) {
            $('#results').html("Details: " + desc.responseText);
        }
    });
}


//uppercase searchquery
String.prototype.strFirstUpper = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function infobtn() {
	alert("Daffa")
}

function createUserProfile(area) {
	let template = `
		<div class="user-container">
			<div class="user-title">
				<h4>${area.name}</h4>
				<p>${area.distance.toFixed(1)} miles</p>
			</div>
			<div class="user-content">
				<div class="user-image"><img src="${area.imageurl}"></div>
				<div class="user-info">
					<p>${area.does} in ${area.location} </p>
					<p>${area.postcode}</p>
					<p>${area.phone}</p>
					<div class="more-info">
						
						<p class="see-profile" onclick="infobtn()"> See more</p>
					</div>
				</div>
			</div>

		</div>
	
	`
	return template;
}


function bubbleSort(arr){
    //Outer pass
    for(let i = 0; i < arr.length; i++){

        //Inner pass
        for(let j = 0; j < arr.length - i - 1; j++){

            //Value comparison using ascending order

            if(arr[j + 1].distance < arr[j].distance){

                //Swapping
                [arr[j + 1],arr[j]] = [arr[j],arr[j + 1]]
            }
        }
    };
    return arr;
};

const results = document.querySelector('#results')

function getdistances(lat, long) {
	let areas = [
		{
			"name": "Jewbees Beauty",
			"postcode": "N15 5ED",
			"location": "Haringey, London",
			"longitude": -0.086461,
			"latitude": 51.585947,
			"imageurl": "https://i.pinimg.com/474x/a0/43/a8/a043a81abe9e6904bd595542e4eef5c8.jpg",
			"phone": "02083553431",
			"does": "Bridal packages",
		},
		{
			"name": "Birmingham Salon",
			"postcode": "B26 3DX",
			"location": "Solihull, Birmingham",
			"longitude": -1.792762,
			"latitude": 52.45416,
			"imageurl": "https://media.gettyimages.com/photos/interior-of-a-barber-shop-picture-id1163443725?s=612x612",
			"phone": "01755564421",
			"does": "Hair/Makeup",
		},
	]
	for(area of areas) {
		area.distance = distanceInMiles(lat, long, area.latitude, area.longitude)
	}
	bubbleSort(areas)
	areas.forEach(area => {
		results.insertAdjacentHTML('beforeend', createUserProfile(area));
	})
	
}

//click search button
const searchbutton = document.querySelector('#btnPostcode')
const input = document.querySelector('#txtPostcode')

searchbutton.addEventListener('click', () => {
    var input = $('#txtPostcode').val();
    var url  = "https://api.postcodes.io/postcodes/"+input;
  
    post(url).done(function(postcode){
      
      let lat = postcode['result'].latitude
      let long = postcode['result'].longitude
      getdistances(lat, long)
    });
})


input.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        searchbutton.click();
    }
})



