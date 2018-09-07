'use strict'

const express = require('express');
const api = express.Router();
const queriesCtrl = require('../controllers/queries');

const login = require('../controllers/login');
const register = require('../controllers/register');
const setStudent = require('../controllers/setStudent');
const savekeys = require ('../controllers/saveKeys');
const auth = require('../middelwares/auth');
const userCtrl = require('../controllers/user');
const savepicture = require ('../controllers/saveProfilePicture');
const saveAssistance = require ('../controllers/saveAssistance');


//Return all users in the DB
api.get('/users', queriesCtrl.findAllUsers)
	//users.route('/users').get(list.findAllUsers)
	
//Return all  subjects  in the DB
api.get('/subjs', queriesCtrl.findAllSubjs)
	//users.route('/users/api').get(list.findAllUsersSubj)
	
// Return all  subjects with specified ID in the DB
//api.get('/subjs/:id', queriesCtrl.findSubjByID)

//Return all  subjects from an user with his ID in the DB
api.post('/usersubjs/:id', queriesCtrl.findUserSubjs)
	//users.route('/users/api/subj/:id').post(list.findUserSubj)
	
//Return all users from a specific PL group of a subject
api.post('/users/list/:subj/:group', queriesCtrl.findUsersByPlGroupSubj)
	//users.route('/users/api/subj/:subj/:group').post(list.findUserByPlGroup)

//Delete a User with specified ID
api.delete('/users/:id', queriesCtrl.deleteUser)

//Delete a subject with his ID from an User
api.delete('/users/subj/:id', queriesCtrl.deleteUserSubj)

//Return the public key from a specific user by ID
api.post('/users/publickey/:id', queriesCtrl.getPublickeyUser)

//Return the public key from a specific user by  email
api.post('/users/publickeyemail/:email', queriesCtrl.getPublickeyUserByEmail)

//Return the email from a specific user by ID
api.post('/users/getEmail/:id', queriesCtrl.getEmailUserById)

//Return a list of all subjects associates to users 
api.get('/subjectsID', queriesCtrl.findAllSubjectsUserID)

//Return a list of all subjects associates to users
api.get('/subjects', queriesCtrl.findAllSubjectsUser)

//Return the profile from an user with his ID in the DB
api.post('/users/getProfile/:id', queriesCtrl.findUserProfile)

//Retutn all the assistances from a user in a subject with his ID in the BD
api.post('/users/assistance/:id/:subjname', queriesCtrl.findUserAssistances)

api.get('/private',auth, function(req, res) {
	res.stauts(200).send({message: 'You have access'})
})

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/verification/:email', function (req, res){
	res.end('<html><body>'
		      + '<h1>Your account has been activated and verified!</h1>'
		      + '</body></html>');
	const a = req.params.email;
	const b = new Buffer(a, 'base64')
	const s = b.toString();
	console.log(s)
	
})

api.get('/', function(req, res) {
		//res.render("index.html")
        res.end("Node-Android")
});

api.post('/login',function(req,res){
        const email = req.body.email;
        const password = req.body.password;
		const code_act = req.body.code_act;
 
        login.login(email,password, code_act, function (found) {
            console.log(found)
            res.json(found)
		});
});

 api.post('/register',function(req,res){
        const name = req.body.name;
		const lastname = req.body.lastname;
		const typeuser = req.body.typeuser;
		const email = req.body.email;
        const password = req.body.password;
 
        register.register(name,lastname,typeuser,email,password,function (found) {
            console.log(found);
            res.json(found);
		});
});

api.post('/savekeys',function(req,res){
		const identUser = req.body.identUser;
        const publickey = req.body.publickey;
		
        savekeys.savekeys(identUser,publickey,function (found) {
            console.log(found);
            res.json(found);
		});
});

api.post('/setSubjUser',function(req,res){
//app.post('/api/setStudent',function(req,res){
	
		const 	id_user = req.body.id_user;
		const 	subj = req.body.subj;
		const	grouppl = req.body.grouppl;
		const	year = req.body.year;
		const	profname = req.body.profname;
		const	profemail = req.body.profemail;

		setStudent.saveSubj(id_user,subj,grouppl,year,profname,profemail,function (found) {
            console.log(found);
            res.json(found);
		});
});

api.post('/saveUserProfilePicture',function(req,res){
		const identUser = req.body.identUser;
        const picture = req.body.picture;
		
        savepicture.savepicture(identUser,picture,function (found) {
            console.log(found);
            res.json(found);
		});
});
	
api.post('/saveAssistance',function(req,res){
	
		const 	id_userS = req.body.id_userS;
		const 	id_userP = req.body.id_userP;
		const 	subjname = req.body.subjname;
		const	session = req.body.session;
		const	grouppl = req.body.grouppl;
		const	date = req.body.date;
		const	useremail = req.body.useremail;
		const	verify = req.body.verify;

		saveAssistance.saveAssistance(id_userS,id_userP,subjname,session,grouppl,date,useremail,verify,function (found) {
            console.log(found);
            res.json(found);
		});
});
	
module.exports = api ;

