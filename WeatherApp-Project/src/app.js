let path = require('path');
let express = require('express');
let hbs = require('hbs');
let weather = require('./utils/weather');
let app = express();

// website
// will contain the following routes:
// app.com - home page 
// app.com/help - help page
// app.com/about - about page

// app takes two arguments
// 1. route
// 2. function for when the route is accessed
	// a. req - request - information about the incoming request to the server
	// b. res - response - information about the outgoing response from the server
	
	
/* app.get('', (req, res) => {
	// tell what happens when the root is accessed.
});	 */


let publicDirectory = path.join(__dirname, '../public');

let viewsDirectory = path.join(__dirname, '../templates/views');

let partialsDirectory = path.join(__dirname, '../templates/partials');


// implement hbs by using app.set()
app.set('view engine', 'hbs');
app.set('views', viewsDirectory); //sets the path of the custom directory(templates folder)
hbs.registerPartials(partialsDirectory); // sets the path of the partials for hbs to use

// points to the public directory where index.html lives
app.use(express.static(publicDirectory));

// home route - / or ''
app.get('', (req, res) => {
	res.render('index', 
		{
			title: 'Home Page',
			name: 'Domonique Nelthrope',
			course: 'CSC 174'
		}
	); // renders the dynamic index template
});	 

 
 

 
 
 // help route - /help
app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help Page',
		helpText: 'This is some helpful text from the help page',
		name: 'Domonique Nelthrope',
		course: 'CSC 174'
	});
});

// about route - /about
app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Page',
		name: 'Domonique Nelthrope',
		course: 'CSC 174'
	});
});

// weather route - /weather
app.get('/weather', (req, res) => {
	//res.send("You have reached the Weather page"); // tell what happens when the weather page is accessed.
	
	if(!req.query.city)
	{
		res.send({
			error: 'You must provide a city!'
		});
	}
	else
	{
		/* res.send({
			forecast: "47 Degrees and Cloudy",
			location: req.query.city
		}); */
		
		//making a call to weather module
		weather(req.query.city, (error, weatherData) => {
			if(error)
				return res.send({error: error});
			else
			{
				res.send({weatherData});
			}
		});
	}
}); 

app.get('/products', (req, res) => {
	if(!req.query.search)
	{
		res.send({
			error: 'You must provide a search term'
		});
	}
	else
	{
		//console.log(req.query);
		res.send({
		products: []
	});
	}
	
	
});



 // help route error page 
app.get('/help/*', (req, res) => {
	res.render('4042', {
		error: "Page not found",
		errorType: "404 Help Article Error"
	});
});
 

// help route error page 
app.get('/*', (req, res) => {
	res.render('4041', {
		error: "Page not found",
		errorType: "404 Error"
	});
});

// add a function as an argument which can tell what happens when 
// the server is located
app.listen(3000, () =>{
	console.log('Server is live on port 3000.');
	console.log('Open your web browser and go to the following URL - locahost: 3000');
	console.log('To exit, come back to Node.js command prompt and enter Ctrl+C');
});