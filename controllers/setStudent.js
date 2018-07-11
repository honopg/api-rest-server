'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');

//const users = mongoose.model('users');
//const subjects = mongoose.model('subjects');

exports.saveSubj = function(id_user,subj,grouppl,year,profname,profemail,callback) {


	user.find({token: id_user},function(err,users){
	subject.find({subj: subj/*.replace(/\s/g, "")*/, User:users[0]._id},function(err,subjects){ // Buscamos asignatura con la id del usuario en linea
	
		if(subjects.length == 0 && users.length != 0){
	
			const newsubject = new subject({	
				subj : subj/*.replace(/\s/g, "")*/,
				grouppl : grouppl, 
				year : year,
				profname : profname,
				profemail : profemail,
				User : users[0]._id
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
			
				if (subjects.length !=0){
				
					callback("Subject already Saved");
 
				}
			}	
		}

	});			
	});
}
