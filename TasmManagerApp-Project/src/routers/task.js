// task router file
let express = require('express');
let Task = require('../models/task.js');

// use the router library to create a router instance
// basic router structures:
	//1. create the router
	//2. set up the routes 
	//3. export the module to be used elsewhere
	
let router = new express.Router();




// grab a task by id
router.get('/tasks/:id', async (req, res) => {
	let _id = req.params.id
	
	try
	{
		let task = await Task.findById(_id); 
		if(!task)
			return res.status(404).send()
		else
			res.send(task);
	}
	catch(error)
	{
		res.status(404).send(error);
	}
	
	
});




// grab all tasks
router.get('/tasks', async (req, res) => {
	try
	{
		let tasks = await Task.find({}) 
		res.send(tasks);
	}
	catch(error)
	{
		res.status(404).send(error);
	}
});



// create new task
router.post('/tasks', async (req, res) => {
	//console.log(req.body);
	//res.send(req.body);
	let task = new Task(req.body);
	
	try
	{
		await task.save();
		res.status(201).send(task);
	}
	catch(error)
	{
		res.status(404).send(error);
	}
});


// update a task by id
router.patch('/tasks/:id', async (req, res) => {
	
	// validation - set up what things can be updated and then validate their ability
	// to be updated
	
	let updates = Object.keys(req.body);// produces an array of keys that are in the request body
	
	// set the components that are allowed to be updated
	let allowedUpdates = ['completed', 'description'];
	
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
		
		
		let task = await Task.findById(req.params.id)
		
		// use a forEach  in order to check for and update the values in the database
		updates.forEach((update) => {
			task[update] = req.body[update];
		});
		
		// call save
		await task.save();
		
		
		
		
		/* 
		let task = await Task.findByIdAndUpdate(req.params.id, req.body, 
			{
					new: true,
					runValidators: true
			}
		
		); */
		
		// 1 of 3 things can happend:
			// 1. update went well
			// 2. update went wrong 
			// 3. there was no task w/ matching id to update
		
		// if there is no task found
		if(!task)
		{
			res.status(404).send();
		}
		else
		{
			// send back the response with the updated user's information
			res.send(task);
		}
	}
	catch(error)
	{
		// either a server related issue
		// or a validation error - based on the model
		res.status(400).send(error);
	}
	
	
	
});





// delete a task by id
router.delete('/tasks/:id', async (req, res) => {
	try
	{
		// find a task by their id and delete
		let task = await Task.findByIdAndDelete(req.params.id); 
		
		// if there is no task found
		if(!task)
		{
			res.status(404).send();
		}
		else
		{
			// send back the response with the updated user's information
			res.send(task);
		}
			
	}
	catch(error)
	{
		res.status(500).send(error);
	}
});

// export the module
module.exports = router;
