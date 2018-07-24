'use strict'

const nodemailer = require('nodemailer');


// email sender function
exports.sendEmail = function(email,name,code, callback) {
//function(req, res){
	
	const b = new Buffer(email);
	const checked = b.toString('base64');
	
// Definimos el transporter

	var transporter = nodemailer.createTransport({
		//service: 'outlook',
		host: "smtp-mail.outlook.com", // hostname
		secureConnection: false, // TLS requires secureConnection to be false
		port: 587, // port for secure SMTP
		tls: {
			rejectUnauthorized: false,
			ciphers:'SSLv3'
		},
		auth: {
			user: 'no-reply-emaiil@outlook.com',
			pass: 'nimdA4321'
		}
	});

    /*var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'no-reply@outlook.com',
            pass: 'password'
        }
    });*/
	
// Definimos el email
var mailOptions = {
    from: '<no-reply-emaiil@outlook.com>',
    //to: 'destinatario@gmail.com',
	to: email,
    subject: 'Verification of the account',
    text: 'Activation email account',
	html: '<b>Hello '+name+', </b><br><br> Your code to verify your account is: <b>'+code+'</b>.<br><br> Thanks for your registration in the application and enjoy it. <br><br> Regards.'
	
	//html: '<b>Hello '+name+', </b><br><br> Click <a href="http://127.0.0.1:3001/api/verification/'+checked+'">here</a> to activate your account.
	//html: pulsa <a href="url/confirmacion?token">aquí</a> para activar tu cuenta
	//html: '<b>Hello '+name+', </b><br><br> Activate your account by clicking on the following link: <a href="#" onclick="change() ;return false">click to activate</a> <input type="text" value=" " name="nombre" > '
	//<a href="#" onclick="cambiar(); return false">Cambiar</a> 
	//<a href="#" onclick="variable='pepe';return false">Enlace</a>
	//<input type="button" onclick='+change()+' value="Activate">
	
	
};

// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        //res.send(500, err.message);
		callback("There was an error sending mail");
    } else {
       
        //res.status(200).jsonp(req.body);
		callback("Email sent");
    }
});


 function change(){
	const texto = "Activated and verified!";
	
	console.log("Entro aqui");
	//document.getElementById('mydiv').innerHTML = texto;
}


};




/*
var EmailCtrl = require('./path/to/controller/mailCtrl');
//email route
router.post('/email', EmailCtrl.sendEmail);

transporter.close();

*/