'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');

//const users = mongoose.model('users');
//const subjects = mongoose.model('subjects');

exports.saveSubj = function(id_user,subj,grouppl,year,profname,profemail,sessions,callback) {


	//user.find({token: id_user},function(err,users){
	//user.findById(id_user, function(err,users){
	user.find({'_id': id_user},function(err,users){
	subject.find({subj: subj/*.replace(/\s/g, "")*/, UserP:users[0]._id, year : year},function(err,subjects){ // Buscamos asignatura con la id del usuario en linea
		console.log(subjects)
		if(subjects.length == 0 && users.length != 0){
	
			const newsubject = new subject({	
				subj : subj/*.replace(/\s/g, "")*/,
				grouppl : grouppl, 
				year : year,
				sessions : sessions,
				profname : profname,
				profemail : profemail,
				UserP : users[0]._id
			});
	
	
			if (users.length != 0){
				newsubject.save(function (err) {
				callback("Subject Saved");
				});
			} else {
				callback("Can´t saved that subject");
			}
	
		} // if
		
		else {
		
			if (users.length == 0){
				callback("Can´t saved that subject with this id_user");
			} else {
			
				if (subjects.length != 0 ){ 
					callback("Subject already Saved");
					
					/*for (var i=0; i< subjects.length; i++){
						if(subjects[i].year != year){
								var n = 1
						}
						
					}
					if(n==1){
						const newsubject = new subject({	
							subj : subj,
							grouppl : grouppl, 
							year : year,
							profname : profname,
							profemail : profemail,
							UserP : users[0]._id
						});
						
						newsubject.save(function (err) {
							callback("Subject Saved");
						});
					}
					else {
						callback("Subject already Saved");
					}*/
				
				}
			}	
		}

	});			
	});
}
