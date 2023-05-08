// display a message
//console.log('Client Side Content loaded from app.js');

// fetch 
	// fetch a url
	// when a promise is fullfilled, you successfully connect to the url
	// then send information back
/* fetch('url').then((response) = {
	function....
}); */


// aim the js at the form in the index.hbs
let weatherForm = document.querySelector('form');
let search = document.querySelector('input');

let message1 = document.querySelector('#message1');
let message2 = document.querySelector('#message2');
let message3 = document.querySelector('#message3');
let message4 = document.querySelector('#message4');

let cityState = document.querySelector('#cityState');
let currentWeather = document.querySelector('#currentWeather');
let currentTemp = document.querySelector('#currentTemp');
let feelsLikeTemp = document.querySelector('#feelsLikeTemp');
let currentTime = document.querySelector('#currentTime');

//update the value of the text in message1 id
//message1.textContent = 'Testing..'

// add action to the form
weatherForm.addEventListener('submit', (e) => {
	e.preventDefault();// keepts the page from refreshing when the button is clicked
	//console.log('testing'); // the buttons actions
	
	// grab the value from the text field (input)
	let city = search.value;
	
	//console.log(city);// display the city entered
	message1.textContent = 'Loading....';
	message2.textContent = 'Loading....';
	message3.textContent = 'Loading....';
	message4.textContent = 'Loading....';
	cityState.textContent = '';
	currentWeather.textContent = '';
	currentTemp.textContent = '';
	time.textContent = '';
	
	
	
	
	//use fetch to display the weather conditions for the city of choice
	fetch('http://localhost:3000/weather?city='+city).then((response) => {
	// jsonify the response 
	response.json().then((data) => {
		//console.log(data);
		if(data.error)
			console.log(error);
		else
		{
			message1.textContent = "Current Weather Conditions for:";
			cityState.textContent = data.weatherData.currentCity + ", " + data.weatherData.currentState;
			currentWeather.textContent = data.weatherData.currentDescription;
			message2.textContent = "Current Temperature: ";
			currentTemp.textContent = data.weatherData.currentTemp + "° F";
			message3.textContent = "Feels like Temperature";
			feelsLikeTemp.textContent = data.weatherData.feelsLikeTemp + "° F";
			message4.textContent = "Local  " + data.weatherData.currentCity + ", " + data.weatherData.currentState + " Time:";
			time.textContent = data.weatherData.time ;
			
		}
	});
});
});


	