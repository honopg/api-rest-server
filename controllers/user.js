'use strict'

const mongoose = require('mongoose');
const User = require('../models/users');
const service = require('../services');

function signUp (req, res){
	const user = new User({
		name: req.body.name,
		lastname: req.body.lastname,
		typeuser: req.body.typeuser,
		password: req.body.password
	})
	
	user.save((err) => {
		if(err) res.status(500).send({message: `Error creating the user: ${err}`})
			
		return res.status(200).send({ token: service.createrToken(user)})
	})
}

function signIn (req, res) {
	User.find({email: req.body.email}, (err,user) =>{
		if(err) return res.status(500).send({message: err})
		if(!user) return res.status(404).send({message: 'The user doesn´t exit'})
			
		req.user = user
		res.status(200).send({
			message: 'Loggin successful',
			token: service.createrToken(user)
		})
	})
}

module.exports = {
	signUp,
	signIn
}