let jwt = require('jsonwebtoken');
let User = require('../models/user.js');

let authenticate = async(req, res, next) => {
	//console.log('Authenticate is running');
	
	try
	{
		let token = req.header('Authorization').replace('Bearer ', '');
		let decoded = jwt.verify(token, 'abracadabra');
		//let user = await User.findOne({_id: decoded._id, 'tokens.token': token});
		//console.log(token);
		
		let user = await User.findOne({_id: decoded._id});
		
		// if user is not found
		if(!user)
		{
			throw new Error();
		}
		else
		{
			req.token = token;
			req.user = user;
			next();
		}
		
	}
	catch(error)
	{
		res.status(401).send({error: 'Please authenicate  the user'});
	}
	
	
}

module.exports = authenticate;