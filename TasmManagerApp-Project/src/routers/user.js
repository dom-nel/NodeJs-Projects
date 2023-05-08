// user router file
let express = require('express');
let User = require('../models/user.js');
let authenticate = require('../middleware/auth.js');


// use the router library to create a router instance
// basic router structures:
	//1. create the router
	//2. set up the routes 
	//3. export the module to be used elsewhere
	
let router = new express.Router();




// create a new user account route
router.post('/users', async(req, res) => {
	//console.log(req.body);
	//res.send(req.body);
	let user = new User(req.body);
	let token = await user.generateAuthToken();
	
	try
	{
		await user.save();
		res.status(201).send({user, token});
	}
	catch(error)
	{
		res.status(404).send(error);
	}
	
	
});


// login route
router.post('/users/login', async(req, res) => {
	try
	{
		// try to test the user's credentials
		let user = await User.findByCredentials(req.body.email, req.body.password);
		
		//generate authenication token
		let token = await user.generateAuthToken();
		
		res.send({user, token});
	}
	catch
	{
		res.status(400).send(error);
	}
	
});

// logout route
router.post('/users/logout', authenticate, async(req,res) => {
	try
	{
		req.user.tokens = req.user.tokens.filter((token)) => {
			return token.token !== req.token;
		});
		await req.user.save();
		res.send();
	}
	catch(error)
	{
		res.status(500).send();
	}
});


// logout all- clear the array of tokens
router.post('/users/logoutAll', authenicate, async(req, res) => {
	try
	{
		req.user.tokens = [];
		await req.user.save();
		res.send();
	}
	catch(error)
	{
		res.status(500).send();
	}
});

/* 
// grab all users- not needed any longer
router.get('/users', authenticate, async(req, res) => {
	
	
	try
	{
		let users = await User.find({}) 
		res.send(users);
	}
	catch(error)
	{
		res.status(404).send(error);
	}
	
}); */


// display the user that is logged in
router.get('/users/me', authenticate, async(req, res) => {
	res.send(req.user);
});



// grab user by Id
router.get('/users/:id', async (req, res) => {
	let _id = req.params.id
	
	try
	{
		let user = await User.findById(_id); 
		if(!user)
			return res.status(404).send()
		else
			res.send(user);
	}
	catch(error)
	{
		res.status(404).send(error);
	}
	
	
});



// update a user by id
router.patch('/users/:id', async (req, res) => {
	
	// validation - set up what things can be updated and then validate their ability
	// to be updated
	
	let updates = Object.keys(req.body);// produces an array of keys that are in the request body
	
	// set the components that are allowed to be updated
	let allowedUpdates = ['name', 'email', 'password', 'age'];
	
	// determine if an entry in the database can be updated based on the keys sent in the request
	let isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});
	
	// check for the valid operation
	if(!isValidOperation)
	{
		res.status(400).send({error: 'Invalid Updates'});
	}
	
	
	try
	{
		
		let user = await User.findById(req.params.id)
		
		// use a forEach  in order to check for and update the values in the database
		updates.forEach((update) => {
			user[update] = req.body[update];
		});
		
		// call save
		await user.save();
		
		/* 
		
		
		let user = await User.findByIdAndUpdate(req.params.id, req.body, 
			{
					new: true,
					runValidators: true
			}
		
		); */
		
		// 1 of 3 things can happend:
			// 1. update went well
			// 2. update went wrong 
			// 3. there was no user w/ matching id to update
		
		// if there is no user found
		if(!user)
		{
			res.status(404).send();
		}
		else
		{
			// send back the response with the updated user's information
			res.send(user);
		}
	}
	catch(error)
	{
		// either a server related issue
		// or a validation error - based on the model
		res.status(400).send(error);
	}
	
	
	
});

// delete a user by id
router.delete('/users/:id', async (req, res) => {
	try
	{
		// find a user by their id and delete
		let user = await User.findByIdAndDelete(req.params.id); 
		
		// if there is no user found
		if(!user)
		{
			res.status(404).send();
		}
		else
		{
			// send back the response with the updated user's information
			res.send(user);
		}
			
	}
	catch(error)
	{
		res.status(500).send(error);
	}
});










// export the module
module.exports = router;


