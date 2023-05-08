let path = require('path');
let express = require('express');

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


//console.log(__dirname);

let publicDirectory = path.join(__dirname, '../public');

//console.log(publicDirectory);

// points to the public directory where index.html lives
app.use(express.static(publicDirectory));

// home route - / or ''
/* app.get('', (req, res) => {
	res.send("<h1>Home Route</h1>"); // tell what happens when the root is accessed.
});	 */

/* // help route - /help 
app.get('/help', (req, res) => {
	res.send("You have reached the help page"); // tell what happens when the help page is accessed.
});

// about route - /about
app.get('/about', (req, res) => {
	res.send([{
		name: 'Dr. Nelthrope',
		course: 'Server Side JavaScript'
	},
	{
		name: 'Mr. Johnson',
		course: 'Basketweaving'
	},
	{
		name: 'Mr. Brown',
		course: 'Art History'
	}
	]); // tell what happens when the about page is accessed.
});

// weather route - /weather
app.get('/weather', (req, res) => {
	res.send("You have reached the Weather page"); // tell what happens when the weather page is accessed.
});
 */

//use app.listen to start up the server
// takes at least 1 parameter - tells the port number where the application 
// will be served
// port 3000 is a common development port for local machines
//app.listen(3000);

// add a function as an argument which can tell what happens when 
// the server is located
app.listen(3000, () =>{
	console.log('Server is live on port 3000.');
	console.log('Open your web browser and go to the following URL - locahost: 3000');
	console.log('To exit, come back to Node.js command prompt and enter Ctrl+C');
});