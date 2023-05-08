require('./db/mongoose.js');
let express = require('express');
let User = require('./models/user.js');
let Task = require('./models/task.js');
let userRouter = require('./routers/user.js');
let taskRouter = require('./routers/task.js');

let app = express();
let port = process.env.PORT || 3000;

/* 

Client will require the authenication token, and the server will validate before performing other operations

Express Middleware will do the following:

	// without middleware: new request -> run route handler
	
	// with middleware: new request -> do something -> run route handler
	
	// something will be a function i.e. check for a valid authenication token or check / generate a server log
	
	// sign up and login wont require authenication in order for them to work

*/

/* // use app.use to use a Middleware function 
app.use((req, res, next) => {
	//console.log(req.method, req.path);
	
	//next();
	
	// if we wanted to shut down get request, then do the following:
	if(req.method === 'GET')
		res.send('GET REQUESTS ARE DISABLED');
}); */

/* 
// use app.use to display maintenance message

app.use((req, res, next) => {
	
		res.status(503).send('Site is currently down for maintenance');
});
 */

// use the router library to create a router instance
// basic router structures:
	//1. create the router
	//2. set up the routes 
	//3. use the router with express apps (GET, POST, PATCH, or DELETE)
/* 	
let router = new express.Router();

router.get('/test', (req, res) => {
	res.send('This is from my router object')
})

 */
 


app.use(express.json());

 app.use(userRouter);
 app.use(taskRouter);





app.listen(port, () => {
	console.log('Server is live on port: ' + port);
});



