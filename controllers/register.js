'use strict'

const user = require('../models/users');
const bcrypt = require('bcryptjs');
 
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

		var newuser = new user({
			name : name,
			lastname : lastname,
			email: email,
			typeuser: typeuser,
			hashed_password: hash,
			created_at: new Date()
		});
 
	user.find({email: email},function(err,users){
 
		const len = users.length;
 
		if(len == 0){
			newuser.save(function (err) {
			callback("Sucessfully Registered");
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