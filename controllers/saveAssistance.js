'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');
const record = require('../models/records');

exports.saveAssistance = function(id_userS, id_userP, subjname, year, session, grouppl, date, useremail, verify, dSignSt, dSignPr, callback) {
	
	
subject.find({'subj':subjname, 'year':year, 'UserP': id_userP, 'grouppl.alumnos': id_userS}, function(err, result) {
	
	if (result !== undefined && result.length !=0){
		const newrecord = new record({	
			subjname     : subjname,
			year         : year,
			NumSession   : session,
			grouppl      : grouppl,
			date         : date,
			//date       : new Date(),
			useremail    : useremail,
			verify       : verify,
			dSignSt      : dSignSt,
			dSignPr      : dSignPr,
			UserS        : id_userS,
			UserP        : id_userP,
			Subj         : result[0]._id
			
		});
						
		newrecord.save(function (err) {
			callback("Assistance Saved");
		});
		
	}
	else{
		callback("Can´t saved that assistance");
	}
})
	/*//user.findById(id_userS, function(err,usersS){
	user.find({'_id': id_userP},function(err,usersP){
		subject.findOne({subj:subjname , year:year,  UserP:usersP[0]._id},function(err, subjectsP){ 
		
			if (subjectsP.length != 0){
				for (var i=0; i< subjectsP.grouppl.length; i++){
					for ( var j=0 ; j<	subjectsP.grouppl[i].alumnos.length ; j++){
						if(subjectsP.grouppl[i].alumnos[j] == id_userS){
							var userS = 1
						}
					}
				}
			
			//user.findById(id_userP, function(err,usersP){
			//user.find({'_id': id_userS},function(err,usersS){
				//subject.find({subj:subjname , User:usersS[0]._id},function(err,subjectsS){ 
				
					//if(usersS != 0 && subjectsS != 0 && usersP != 0 && subjectsP != 0){
					if(	usersP != 0 && userS == 1){
						const newrecord = new record({	
							subjname : subjname,
							year    : year,
							session : session,
							grouppl : grouppl,
							date : date,
							useremail : useremail,
							verify : verify,
							//UserS : usersS[0]._id,
							UserS : id_userS,
							UserP : usersP[0]._id
						});
						
						newrecord.save(function (err) {
						callback("Assistance Saved");
						});
					}
					else {
						callback("Can´t saved that assistance");
					}
					
					
			
					
				//});
			//});
			}
		
	
		});
		
		
	});*/
	
	
}