'use strict'

const user = require('../models/users');
const bcrypt = require('bcryptjs');


exports.login = function(email,password,callback) {

user.find({email: email},function(err,users){

	if(users.length != 0){

		const ident = users[0]._id;
		const ocuppation = users[0].typeuser;
		const hashed_password = users[0].hashed_password;
		
		if(bcrypt.compareSync(password, hashed_password)){

			callback({'response':"Login Sucess",'res':true,'ocupacion':ocuppation,'ident':ident});

		}else{
		
			callback({'response':"Invalid Password",'res':false});
			//callback("Invalid Password");
		}
	}else {

		callback({'response':"User not exist",'res':false});
		//callback("User not exist");
	}
});
}