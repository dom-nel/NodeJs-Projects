let mongoose = require('mongoose');
let validator = require('validator');

let Task = mongoose.model('Task', {
	description: {
		type: String,
		required: true,
		trim: true
	}, 
	completed: {
		type: Boolean,
		required: false,
		default: false
	}
});

module.exports = Task;