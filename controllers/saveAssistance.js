'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');
const record = require('../models/records');

exports.saveAssistance = function(id_userS,id_userP,subjname,session,grouppl,date,useremail,verify,callback) {
	
	//user.findById(id_userS, function(err,usersS){
	user.find({'_id': id_userS},function(err,usersS){
		subject.find({subj:subjname , User:usersS[0]._id},function(err,subjectsS){ 
			
			//user.findById(id_userP, function(err,usersP){
			user.find({'_id': id_userP},function(err,usersP){
				subject.find({subj:subjname , User:usersP[0]._id},function(err,subjectsP){ 
				
					if(usersS != 0 && subjectsS != 0 && usersP != 0 && subjectsP != 0){
						const newrecord = new record({	
							subjname : subjname,
							session : session,
							grouppl : grouppl,
							date : date,
							useremail : useremail,
							verify : verify,
							UserS : usersS[0]._id,
							UserP : usersP[0]._id
						});
						
						newrecord.save(function (err) {
						callback("Assistance Saved");
						});
					}
					else {
						callback("Can´t saved that assistance");
					}
					
					
			
					
				});
			});
		
		
	
		});
		
		
	});
	
	
}