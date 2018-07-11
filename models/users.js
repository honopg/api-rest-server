'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
 
const UserSchema = Schema({
	name : {type: String, required : true},
	lastname : String,
	typeuser : { type: String, enum: ['Alumno', 'Profesor']},
	picture : String,
    email: { type: String, required : true, unique : true, lowercase: true},
    //password: {type: String,required : true},
	hashed_password	: String,
	created_at		: String,
	temp_password	: String,
	temp_password_time	: String,
	publickey : String
	
});

/*
UserSchema.pre('save', (next) => {
	let user = this
	if(!user.isModified('password')) return next()
		
	bcrypt.genSalt(10, (err, salt) =>{
		if(err) return next(err)
		
		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if(err) return next(err)
			
			user.password = hash
			next()
		})
	})
})*/

module.exports = mongoose.model('users', UserSchema);


