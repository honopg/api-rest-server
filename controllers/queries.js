'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');


//GET - Return all users in the DB
exports.findAllUsers = (req, res) => {
	console.log('GET /users')

  user.find({},(err, users) => {
	  if (err) return res.status(500).send(err.message)
	  if (!user) return res.status(404).send({message:'There are no users'})
		  
	  res.status(200).jsonp(users)

  })

}


//DELETE - Delete a User with specified ID
exports.deleteUser = (req, res) => {
    const id = req.params.id
    console.log(`DELETE /users/${id}`)

    user.findById(id, (err, users) => {

    	if (!user) return res.status(404).send({message: 'User not exist'})

        users.remove( (err) => {
        	if (err) return res.status(500).send(err.message)
      		
      		res.status(200).jsonp({message: 'User deleted'})
        })
    })
}


//GET - Return all  subjects  in the DB
exports.findAllSubjs = (req, res) => {
	console.log('GET /subjs')

  subject.find((err, subjects) => {
	  
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects'})

	  res.status(200).jsonp(subjects)

  })

}

//GET - Return all  subjects with specified ID in the DB
/*exports.findSubjByID = (req, res) => {
	const id = req.params.id
	console.log('GET /subjs/${id}')

	subject.findById(id, (err, subjects) => {
  
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'No existe esa asignatura'})

	  res.status(200).jsonp(subjects)

	})

}*/

//GET - Return all  subjects from an user with his ID in the DB
exports.findUserSubjs = (req, res) => {
	const id = req.params.id
	console.log('POST /usersubjs/${id}')

	subject.find({'User' :id}, {'_id':0,'subj':1,'grouppl':1,'year':1,'profname':1,'profemail':1}, function(err, subjects){
 
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects for that user'})

	  res.status(200).jsonp(subjects)

	})
	

}

// GET - Return all users from a specific group of a subject
exports.findUsersByPlGroupSubj = (req, res) => {
	const subj = req.params.subj
	const group = req.params.group
	const array = []
	array = group.split(";")
	//var s = subj.replace(/(.)([A-Z])/g, "$1 &2");
	const s = subj.replace(/([A-Z])/g, " $1").trim();

	console.log('POST /users/list/${subj}/${group}')

	subject.find({subj:s , grouppl:{ $in: array }, User :{$exists : true, $ne: null }},{'subj':0,'year':0,'profname':0,'profemail':0,'__v':0}).populate({path:'User',select:'email'}).exec(function (err, subjects){
	
	  if (err) return res.status(500).send(err.message)
	  //if (!subject) return res.status(404).send({message:'There are no users in that group'})

	  res.status(200).jsonp(subjects)
	  
	})
	
}


//DELETE - Delete a subject with specified ID from an User
exports.deleteUserSubj = (req, res) => {
    const id = req.params.id
    console.log(`DELETE /users/subj/${id}`)

    subject.findById(id, (err, subjects) => {

    		if (!subject) return res.status(404).send({message: 'Subject not saved'})

        subjects.remove( (err) => {
        	if (err) return res.status(500).send(err.message)
      		
      		res.status(200).jsonp({message: 'Subject deleted'})
        })
    })
}

// GET - Return the publickey from a specific user by id 
exports.getPublickeyUser = (req, res) => {
	const id = req.params.id
	console.log('POST /users/publickey/${id}')
	
	user.findById(id, {'_id':0,'name':0,'lastname':0,'email':0,'typeuser':0,'picture':0,'__v':0,'password':0}, function(err, pbkey){
	//user.findById(id, {'_id':0,'token':0,'name':0,'lastname':0,'email':0,'typeuser':0,'salt':0,'__v':0,'hashed_password':0,}, function(err, pbkey){
	 
		if (err) return res.status(500).send(err.message)
	    //if (!user) return res.status(404).send({message:'There are no public key'})
		
		res.status(200).jsonp(pbkey)
	  
	})
}

// GET - Return the publickey from a specific user by  email
exports.getPublickeyUserByEmail = (req, res) => {
	const email = req.params.email
	const s = '@uniovi.es';
	const e = email+s;
	console.log('POST /users/publickeyemail/${email}')
	
	user.findOne({email:e}, {'_id':0,'name':0,'lastname':0,'email':0,'typeuser':0,'picture':0,'__v':0,'password':0}, function(err, pbkey){
	//user.findOne({email:e}, {'_id':0,'token':0,'name':0,'lastname':0,'email':0,'typeuser':0,'salt':0,'__v':0,'hashed_password':0}, function(err, pbkey){
	 
		if (err) return res.status(500).send(err.message)
	    //if (!user) return res.status(404).send({message:'There are no public key'})
		
		res.status(200).jsonp(pbkey)
	  
	})
}


// GET - Return the email from a specific user by id 
exports.getEmailUserById = (req, res) => {
	const id = req.params.id
	// var email = req.params.email
	console.log('POST /users/getEmail/${id}')
	
	user.findById(id, {'_id':0,'name':0,'lastname':0,'typeuser':0,'picture':0,'__v':0,'password':0,'publickey':0}, function(err, emayl){
	//user.findById(id, {'_id':0,'token':0,'name':0,'lastname':0,'typeuser':0,'salt':0,'__v':0,'hashed_password':0,'publickey':0}, function(err, emayl){
	 
		if (err) return res.status(500).send(err.message)
			
		res.status(200).jsonp(emayl)
	  
	})
}

// GET - Return list of all subjects associates to users (show only IDUser)
exports.findAllSubjectsUserID = (req, res) => {
	console.log('GET /subjectsID')

  subject.find({},(err, asignaturas) => {
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects'})
		  
	  res.status(200).send(asignaturas)

  })

}

// GET - Return list of all subjects associates to users (show all fields of the User)
exports.findAllSubjectsUser = (req, res) => {
	console.log('GET /subjects')

  subject.find({},(err, asignatura) => {
	  user.populate(asignatura, {path: "User"},function(err, asignatura){
				res.status(200).send(asignatura)
			})
  })

}

//GET - Return the profile from an user with his ID in the DB
exports.findUserProfile = (req, res) => {
	const id = req.params.id
	console.log('POST /getProfile/${id}')

	user.findById(id, {'_id':0,'name':1,'lastname':1,'typeuser':0,'picture':1,'__v':0,'password':0,'created_at':1,'publickey':0}, function(err, userp){
 
	  if (err) return res.status(500).send(err.message)
	  if (!userp) return res.status(404).send({message:'Couldn´t find the profile'})

	  res.status(200).jsonp(userp)

	})
	

}

