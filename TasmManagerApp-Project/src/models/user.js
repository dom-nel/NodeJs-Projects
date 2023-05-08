let mongoose = require('mongoose');
let validator = require('validator');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

/*
	Middleware is used to customize the behavior of mongoose models
	
	With Middleware we can register some events to run before or after events occur
*/

// create schema Object
let userSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true, // sets the validator so that the name is a required field
			trim: true //removes extra spaces from value
		},
		age: {
			type: Number,
			default: 0, // if an age value isnt passed it gives a default value
			// custom validator
			validate(value)
			{
				if(value < 0)
				throw new Error('Age must be a positive nunmber');
			}
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true, // converts all text to lowercase letters
			unique: true,
			validate(value)
			{
				if(!validator.isEmail(value))
				{
					throw new Error('Email is invalid');
				}
			}
		},
		password: {
			type: String,
			required: true,
			minlength: 7, // mininum length of characters for the field
			trim: true,
			validate(value)
			{
				
				// check to see fif the password is the text 'password' 
				if(value.toLowerCase().includes('password'))
					throw new Error('Password cannot contain the word password')
				else if(value.includes('1234567'))
					throw new Error('Password cannot contain the text 123456');
			}
		},
		
		tokens:[
			{
				token: 
				{
					type: String,
					required: true
				}
			}
		]
	}
);

// methods allows for us to make instance functions 
userSchema.methods.generateAuthToken = async function() {
	let user = this; // grabs the current instance of the user model
	
	// use.sign() in order to generate the token
	let token = jwt.sign({_id: user.id.toString()}, 'abracadabra');
	
	// update the tokens login array by adding in the new authenication to the tokens array
	user.tokens = user.tokens.concat({token: token});
	
	// save the user to save the new authenication token
	await user.save();
	
	return token;
}

// statics allow for us to make model functions
userSchema.statics.findByCredentials = async (email, password) => {
	// call the find one function - finds based on the users email address
	let user = await User.findOne({email});
	
	// if no matching user, throw an Error
	if(!user)
	{
		throw new Error('Unable to login!');
	}
	
	// check to see if the password matches 
	let isMatch = await bcrypt.compare(password, user.password);
	
	// if the password is incorrect, throw an error
	if(!isMatch)
	{
		throw new Error('Unable to login!');
	}
	
	return user;
};

// use Middleware to do something to the schema
	// use pre() - to do something before the schema is saved
	// use post() - to do something after the schema is saved
	// we will use pre()
		// pre takes two arguments:
			// 1. action - validate, save, remove, or init - we will use 'save'
			// 2. an inline function that tells what happened
			
userSchema.pre('save', async function(next) {
	{
		// use this as a reference to the current document that is being saved
		// implies that we are doing something to the user item before being saved into the database
		let user = this;
		
		//console.log('Just before saving');
		
		// now we can hash the password
		// first check to see if the password has been changed or hased already
		
		if(user.isModified('password'))
		{
			user.password = await bcrypt.hash(user.password, 8);
		}
		
		
		// next is called at the end of the function to tell the app to continue processing (saving) the data
		// without next, the program will just hang, thinking that it is still processing data
		next();
	}
})			

// define a model 
// define a sample User model 
let User = mongoose.model('User', userSchema);

module.exports = User;