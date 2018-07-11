'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');

exports.savekeys = function(identUser,publickey,callback) {
	//update,token: id_user
	user.findByIdAndUpdate({"_id": identUser}, {'$set': {'publickey':publickey}}, {upsert:true}, function(err, users) {
			if (err) {
				callback("User not exist, ident error!");
			}else{
				//console.log(users);
				callback("Public key saved");
				}
			
	});
	
	/*Otra forma
	user.find({"_id": identUser},function(err,users){
		if(users.length != 0){
			
			user.update( {"_id":users[0]._id}, {'$set': {'publickey':publickey}}, {upsert:true}, function(err, raw){
			
			if (err) {
				callback("Eror");
			}
			//console.log(users);
			callback("Keys saved");
			});
			
		
		}else {
			callback("User not exist, ident error!");
		}
	
	});	*/
}