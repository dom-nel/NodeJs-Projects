var request = require('request');

let weather = (city, callback) => {
	// get the URL
	var url = 'http://api.weatherstack.com/current?access_key=814b2d348b71a89bbc8ee0ea651665e8&query='+ city +'&units=f';
	
	request({url: url, json: true}, (error, response) => {
		if(error)
		{
			// low level error
			callback("Unable to connect to the Weather API");
		}
		else if(response.body.error)
		{
			// check to see if we have an API level error
			callback(`${response.body.error.info}`);
		}
		else
		{
			// if there is no error, generate the data to the callback
			callback(undefined, {
				currentCity: response.body.location.name,
				currentState: response.body.location.region,
				currentDescription: response.body.current.weather_descriptions[0],
				currentTemp: response.body.current.temperature,
				feelsLikeTemp: response.body.current.feelslike,
				lat: response.body.location.lat,
				lon: response.body.location.lon,
				time: response.body.location.localtime
				
			});
		}
	});
};

module.exports = weather;