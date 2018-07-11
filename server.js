'use strict'

const mongoose = require('mongoose');
//const MongoClient = require('mongodb').MongoClient;
const app = require('./app');
const config = require('./config');


mongoose.connect(config.db,(err,res) => {
	if(err) {
		return console.log(`Error to connect to the database: ${err}`)
	}
	console.log('Connection established with the database...');
	
	app.listen(config.port, () => {
	console.log('Server running on http://localhost:%s', config.port);
	});
});
