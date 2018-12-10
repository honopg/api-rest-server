'use strict'

const user = require('../models/users');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


exports.login = function(email,password,code_act, callback) {

user.find({email: email},function(err,users){

	if(users.length != 0){

		const act = users[0].active;
		const code_hash = users[0].code_act;
		
		const ident = users[0]._id;
		const ocuppation = users[0].typeuser;
		const hashed_password = users[0].hashed_password;
		const name = users[0].name;
		const lastname = users[0].lastname;
			
			if (act == 0 && code_act == null){
				callback({'response':"Verify your account to be able to login",'res':false});
			}
			
			if (act == 0 && code_act != null){
				
				const hashed_code = crypto.createHash('md5').update(code_act.toString()).digest('hex');
				if(code_hash == hashed_code){
					act == 1;
					user.update( {"_id":users[0]._id}, {'$set': {'active':1}}, {upsert:true}, function(err, raw){
						callback({'response':"Verified account",'res':true});
					})	
				
				} else{
					callback({'response':"Erroneous verification code",'res':false});
				}
			} 
				
			if (act == 1 && (code_act==null || code_act != null)) {
				if(bcrypt.compareSync(password, hashed_password)){
					callback({'response':"Login Sucess",'res':true,'ocupacion':ocuppation,'ident':ident, 'name':name,'lastname':lastname});
					
				}else{
					callback({'response':"Invalid Password",'res':false});
					//callback("Invalid Password");
				}
			} 
		
	}else {

		callback({'response':"User not exist",'res':false});
		//callback("User not exist");
	}
});
}

		
	