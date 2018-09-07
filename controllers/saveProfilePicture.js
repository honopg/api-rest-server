'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');

exports.savepicture = function(identUser,picture,callback) {
	//update,token: id_user
	user.findByIdAndUpdate({"_id": identUser}, {'$set': {'picture':picture}}, {upsert:true}, function(err, users) {
			if (err) {
				callback("User not exist, ident error!");
			}else{
				//console.log(users);
				callback("Profile picture saved");
				}
			
	});
	
	/*Otra forma
	user.find({"_id": identUser},function(err,users){
		if(users.length != 0){
			
			user.update( {"_id":users[0]._id}, {'$set': {'picture':picture}}, {upsert:true}, function(err, raw){
			
			if (err) {
				callback("Eror");
			}
			//console.log(users);
			callback("Profile picture saved");
			});
			
		
		}else {
			callback("User not exist, ident error!");
		}
	
	});	*/
}