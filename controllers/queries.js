'use strict'

const mongoose = require('mongoose');
const user = require('../models/users');
const subject = require('../models/subjects');
const record = require('../models/records');


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

//GET - Return all  subjects from an user (Professor) with his ID in the DB
exports.findUserPrSubjs = (req, res) => {
	const id = req.params.id
	console.log('POST /userprsubjs/${id}')

	//subject.find({'User' :id}, {'_id':0,'subj':1,'grouppl':1,'year':1,/*'profname':1,*/'profemail':1}, function(err, subjects){
	subject.find({'UserP' :id}, {'_id':0,'profname':0,'grouppl._id':0,'grouppl.total':0,'grouppl.session':0/*,'sessions':0*/,'__v':0,'grouppl.alumnos':0,'UserP':0}, function(err, subjects){	
 
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects for that user'})

	  res.status(200).jsonp(subjects)

	})
	

}

//GET - Return all  subjects of a Year from an user (Professor) with his ID in the DB
exports.findUserPrSubjsYear = (req, res) => {
	const id = req.params.id
	const year = req.params.year
	console.log('POST /userprsubjs/${id}/$(year)')

	//subject.find({'User' :id}, {'_id':0,'subj':1,'grouppl':1,'year':1,/*'profname':1,*/'profemail':1}, function(err, subjects){
	subject.find({'UserP' :id, 'year':year}, {'_id':0,'profname':0,'grouppl._id':0,'grouppl.total':0,'grouppl.session':0/*,'sessions':0*/,'__v':0,'grouppl.alumnos':0,'UserP':0}, function(err, subjects){	
 
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects for that user'})

	  res.status(200).jsonp(subjects)

	})
	

}

//GET - Return all  subjects from an user (Students) with his ID in the DB
exports.findUserStSubjs = (req, res) => {
	const id = req.params.id
	console.log('POST /userstsubjs/${id}')

	//subject.find({'grouppl.alumnos' : id}, {'_id':0,'grouppl._id':0,'__v':0,'UserP':0 /*,'grouppl.alumnos':0*/}, function(err, subjects){	
	//subject.find({'grouppl.alumnos' : id}, {'_id':0,'subj':1,'year':1,'profname':1,'profemail':1,'grouppl.$':1 /*,'grouppl.alumnos':0*/}, function(err, subjects){	
	subject.find({'grouppl.alumnos' : id}, {grouppl: {$elemMatch: {alumnos:id}}, '_id':0,'grouppl._id':0,'grouppl.session':0,'grouppl.total':0,'sessions':0,'__v':0,'UserP':0 ,'grouppl.alumnos':0}, function(err, subjects){
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects for that user'})

	  res.status(200).jsonp(subjects)

	})
	

}

//GET - Return all  subjects of a Year from an user (Students) with his ID in the DB
exports.findUserStSubjsYear = (req, res) => {
	const id = req.params.id
	const year = req.params.year
	console.log('POST /userstsubjs/${id}/$(year)')

	//subject.find({'grouppl.alumnos' : id}, {'_id':0,'grouppl._id':0,'__v':0,'UserP':0 /*,'grouppl.alumnos':0*/}, function(err, subjects){	
	//subject.find({'grouppl.alumnos' : id}, {'_id':0,'subj':1,'year':1,'profname':1,'profemail':1,'grouppl.$':1 /*,'grouppl.alumnos':0*/}, function(err, subjects){	
	subject.find({'grouppl.alumnos' : id, 'year':year}, {grouppl: {$elemMatch: {alumnos:id}}, '_id':0,'grouppl._id':0,'grouppl.session':0,'grouppl.total':0,'sessions':0,'__v':0,'UserP':0 ,'grouppl.alumnos':0}, function(err, subjects){
	  if (err) return res.status(500).send(err.message)
	  if (!subject) return res.status(404).send({message:'There are no subjects for that user'})

	  res.status(200).jsonp(subjects)

	})
	

}

// GET - Return all users from a specific group of a subject
exports.findUsersByPlGroupSubj = (req, res) => {
	const subj = req.params.subj
	const group = req.params.group
	var array = []
	array = group.split(";")
	//var s = subj.replace(/(.)([A-Z])/g, "$1 &2");
	var s = subj.replace(/([A-Z])/g, " $1").trim();

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

//DELETE - Delete an Assistance with specified ID 
exports.deleteAssistance = (req, res) => {
    const id = req.params.id
    console.log(`DELETE /users/assist/${id}`)

    record.findById(id, (err, records) => {

    		if (!record) return res.status(404).send({message: 'Asssistance not saved'})

        records.remove( (err) => {
        	if (err) return res.status(500).send(err.message)
      		
      		res.status(200).jsonp({message: 'Assistance deleted'})
        })
    })
}

// GET - Return the publickey from a specific user by id 
exports.getPublickeyUser = (req, res) => {
	const id = req.params.id
	console.log('POST /users/publickey/${id}')
	
	user.findById(id, {'_id':0,'name':0,'lastname':0,'email':0,'typeuser':0,'picture':0,'__v':0,'hashed_password':0,'created_at':0,'active':0,'code_act':0}, function(err, pbkey){
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
	
	user.findOne({email:e}, {'_id':0,'name':0,'lastname':0,'email':0,'typeuser':0,'picture':0,'__v':0,'hashed_password':0,'created_at':0,'active':0,'code_act':0}, function(err, pbkey){
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
	
	user.findById(id, {'_id':0,'name':0,'lastname':0,'typeuser':0,'picture':0,'__v':0,'hashed_password':0,'created_at':0,'active':0,'code_act':0,'publickey':0}, function(err, emayl){
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
	console.log('POST /users/getProfile/${id}')

	user.findById(id, {'_id':0,'__v':0,'hashed_password':0,'active':0,'code_act':0,'publickey':0}, function(err, userp){
 
	  if (err) return res.status(500).send(err.message)
	  if (!userp) return res.status(404).send({message:'Couldn´t find the profile'})

	  res.status(200).jsonp(userp)

	})
	

}

// GET - Retutn all the assistances from a user in a subject with his ID in the BD
exports.findUserAssistances = (req, res) => {
	const id = req.params.id
	const subjname = req.params.subjname
	
	var s = subjname.replace(/([A-Z])/g, " $1").trim();
	console.log('POST /users/assistance/${id}/${subjname}')
	
	record.find({$or:[{'UserS' :id},{'UserP' : id}], 'subjname' : s}, {'_id':0,'__v':0,'UserP':0,'UserS':0}, function(err, records){

	//record.find({'UserS' :id, 'UserP' : id, 'subjname' : s}, {'_id':0,'subjname':1,'session':1,'date':1,'useremail':1,'verefy':1}, function(err, records){
		//find({ subj:s, grouppl:{ $in: array }, User :{$exists : true, $ne: null }},{'subj':0,'year':0,'profname':0,'profemail':0,'__v':0}).populate({path:'User',select:'email'}).exec(function (err, subjects){
		//subject.find({'User' :id}, {'_id':0,'subj':1,'grouppl':1,'year':1,'profname':1,'profemail':1}, function(err, subjects){
	
	  if (err) return res.status(500).send(err.message)
	  if (!record) return res.status(404).send({message:'There are no assistances.'})

	  res.status(200).jsonp(records)
	  
	})
	
}

// GET - Find subjects in the data base by name of the subject and email of the professor
exports.findSubjects = (req, res) => {
	
	const subjname = req.params.subjname
	const email = req.params.email
	const s = '@uniovi.es';
	
	console.log('POST /userFindSubjs/${subjname}/${email}/')	

	if (  email != null || email != undefined){
		const emailprof = email+s;
		subject.find({'subj' :{$regex:subjname, $options: "si"} , 'profemail' :emailprof }, {'_id':0,'__v':0}, function(err, subje){
	
		if (err) return res.status(500).send(err.message)
		if (!subje) return res.status(404).send({message:'There are no subjects.'})

	  res.status(200).jsonp(subje)
	  
		})
	} else {
		
		subject.find({'subj' :{$regex:subjname, $options: "si"} }, {'_id':0,'__v':0}, function(err, subjec){
	
		if (err) return res.status(500).send(err.message)
		if (!subjec) return res.status(404).send({message:'There are no subjects.'})

		res.status(200).jsonp(subjec)
	  
		})
		
	}
	
	//var subjn = subjname.replace(/([A-Z])/g, " $1").trim();
	
	
}

exports.findSubjs = function(subj,profemail, callback) {

	if (  profemail.length != 0 && profemail != null && profemail != undefined /*&& !profemail.isEmpty()*/ ){
		
		subject.find({'subj' :{$regex:subj, $options: "si"} , 'profemail' :profemail }, {'_id':0,'__v':0,'grouppl.alumnos':0,'grouppl.total':0,'grouppl.session':0,'sessions':0,'grouppl._id':0, 'UserP':0, 'profname':0}, function(err, subjec){
			if (subjec.length == 0){
				callback("No subjects found")
			} else{
				callback({subjec});
			}
		})
	} else{
		subject.find({'subj' :{$regex:subj, $options: "si"} }, {'_id':0,'__v':0,'grouppl.alumnos':0,'grouppl.session':0,'sessions':0,'grouppl._id':0,'grouppl.total':0, 'UserP':0, 'profname':0}, function(err, subjec){
			if (subjec.length == 0){
				callback("No subjects found")
			} else{
				callback({subjec});
			}
		})
		
	}

}

// UPDATE - Subscribe a student to a PL group of a subject 

exports.subscribeSubjs = function(subj, profemail, pl, year, alumnos, callback) {
	//{$regex:subj, $options: "si"}
	subject.find({'subj' : subj, 'year' : year, 'grouppl.alumnos' : alumnos }, function(err, result){ 
		
		if (result !== undefined && result.length !=0){
			callback("You are already subscribed to a group for this subject.")
		} else {
			subject.findOne({'subj' : subj , 'profemail' :profemail, 'year' : year}, {/*'_id':0,*/'__v':0}, function(err, subjec){
				// Puede quitarse el if
				if (subjec.length != 0){
			
					for (var i=0; i< subjec.grouppl.length; i++){
						for ( var j=0 ; j<	subjec.grouppl[i].alumnos.length ; j++){
							if(subjec.grouppl[i].alumnos[j] == alumnos){
							var f = 1
							}
						}
					}
			
					if( f ==  1){
						callback("You are already subscribed to a group.")
					}
					else{
						// $push or $addToSet
						subject.update({'_id': subjec._id, 'grouppl.pl':pl},{$addToSet:{"grouppl.$.alumnos":alumnos},$inc :{"grouppl.$.total" : 1}},function(err,subj){ 
						
							callback("You have subscribed correctly.")
						})
					}
				} else{
					callback("No subjects found.");
				}
			})
		}
	
	})
	
}


// DELETE - Delete a student´s email from the PL group  from the professor´s list

exports.deleteStudentEmail = function(subj, profemail, year, stuemail, callback) {
	
	user.find({'email' : stuemail }, {'_id':1}, function(err, student){ 
		subject.find({'grouppl.alumnos' : student[0]._id, 'profemail' :profemail, 'year':year, 'subj' : subj }, {grouppl: {$elemMatch: {alumnos:student[0]._id}},/* '_id':0,'grouppl._id':0,*/'__v':0/*,'UserP':0 ,'grouppl.alumnos':0*/}, function(err, result){
			
			//var pl = result[0].grouppl[0].pl)
			if (result !== undefined && result.length !=0){
				subject.findOne({'subj' : subj , 'profemail' :profemail, 'year' : year}, {'__v':0}, function(err, subjec){ 
					if (subjec.length != 0){ 
						subject.update({'_id':result[0]._id,'grouppl.alumnos':student[0]._id},{$pull: {"grouppl.$.alumnos": student[0]._id  },$inc :{"grouppl.$.total" : -1}},function(err, subj){ 
							
							callback("The student has been eliminated correctly.")
						})

					} else {
						callback("Error when removing the student.")
					}
				})
			} else {
				callback("That student is no longer available.")
			}	
		})
	})
	
}



