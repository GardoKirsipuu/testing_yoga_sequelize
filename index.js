const express = require("express");
const app = express();

// parse requests of content-type - application/json
app.use(express.json());
// parse request of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/yoga_sequelize');

// testing connection
sequelize
	.authenticate()
	.then(() => {
		console.log('Connected to the database');
	})
	.catch(err => {
		console.error('Unable to connect to the database', err);
	});

// using routes and controllers
const articleRouter = require('./routes/article');
app.use('/', articleRouter);


// listen request
app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000');
});