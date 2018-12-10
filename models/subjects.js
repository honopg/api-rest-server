'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = mongoose.model('users');
//const users = require('../models/users');

const SubjectSchema = Schema({
   
	//id_user : String,
	subj : String,
	/*grouppl : [String],*/
	year : String,
	profname : String,
	grouppl:[{
		pl : String,
		//alumnos : [String]
		alumnos : [{type : mongoose.Schema.Types.ObjectId, ref: "users"}]
	}],
	profemail : String,
	UserP : {type : mongoose.Schema.Types.ObjectId, ref: "users"}
	
});

module.exports = mongoose.model('subjects', SubjectSchema);