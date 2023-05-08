let mongoose = require('mongoose');
let validator = require('validator');

// use mongoose.connect to connect to the database
// just like Mongoclient, provide the database url and the options
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
	useNewUrlParser: true
});





