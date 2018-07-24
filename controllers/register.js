'use strict'

const user = require('../models/users');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const emailCtrl = require ('../controllers/emailCtrl');
 
exports.register = function(name,lastname,typeuser,email,password,callback) {
 
	const w = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)*(uniovi.es{1})$/;
	const k = password;
	const s = /Alumno/;
	const q = /Profesor/;
	const e = /^([uU][oO]).*([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)*(uniovi.es{1})$/;
	


	if ( name != null || name != undefined){
	if ( email != null || email != undefined){
	if ( w.test(email) ){
	if ( typeuser != null || typeuser != undefined){
	if ( s.test(typeuser) && e.test(email) || q.test(typeuser) && !e.test(email)) {
	if (password != null && password.length > 5 ) {
	
		const salt = bcrypt.genSaltSync(10);
		const hash = bcrypt.hashSync(password,salt);
		const code = Math.round(Math.random()*999999);
		const hash_code = crypto.createHash('md5').update(code.toString()).digest('hex');
		//const hash_code = bcrypt.hashSync(code.toString(),salt);
		
		var newuser = new user({
			name : name,
			lastname : lastname,
			email: email,
			typeuser: typeuser,
			hashed_password: hash,
			created_at: new Date(),
			active : 0,
			code_act : hash_code
		});
 
	user.find({email: email},function(err,users){
 
		const len = users.length;
 
		if(len == 0){
			newuser.save(function (err) {
			//callback("Sucessfully Registered");
				////
			callback("Stored data. Check your email to verify the email account");
			emailCtrl.sendEmail(newuser.email, newuser.name, code, function (found) {
            console.log(found)
				});
			});
		}else{
			callback("Email already Registered");
			}
	}); 
	}
	else{
		callback("Password Weak");
		} 
	}else{
		callback("Your email is invalid for that occupation");
		}
	}else{
		callback("Typeuser is required");
		}
	}else{
		callback("Email Not Valid");
		}
	}else{
		callback("Email is required");
		}
	}else{
		callback("Name is required");
		}
}