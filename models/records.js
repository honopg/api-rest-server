'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const users = mongoose.model('users');
const subjects = mongoose.model('subjects');
//const users = require('../models/users');
//const subjects = require('../models/subjects');

const RecordSchema = Schema({
   
	id_userS : String,
	id_userP : String,
	subjname : String,
	year     : String,
	NumSession : String,
	grouppl : String,
	date : Date,
	//date : String,
	useremail : String,
	UserS : {type : mongoose.Schema.Types.ObjectId, ref: "users"},
	UserP : {type : mongoose.Schema.Types.ObjectId, ref: "users"},
	Subj : {type : mongoose.Schema.Types.ObjectId, ref: "subjects"},
	verify: String,
	dSignSt : String,
	dSignPr : String,
	
});

module.exports = mongoose.model('records', RecordSchema);