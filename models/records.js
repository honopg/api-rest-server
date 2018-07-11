'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = mongoose.model('users');
const subjects = mongoose.model('subjects');
//const users = require('../models/users');
//const subjects = require('../models/subjects');

const RecordSchema = Schema({
   
	id_user : String,
	id_subj : String,
	subjname : String,
	session : String,
	date : Date,
	useremail : String,
	User : {type : mongoose.Schema.Types.ObjectId, ref: "users"},
	Subj : {type : mongoose.Schema.Types.ObjectId, ref: "subjects"},
	verify: String,
	
});

module.exports = mongoose.model('subjects', SubjectSchema);