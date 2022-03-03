// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/yoga_sequelize');

// read model data for table representation
const models = require('../../models')

// show article by this slug
const getAuthor = (req, res) => {
	let queryElement = Object.keys(req.query)
	if(Object.keys(req.query).length === 0){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.author_name === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.id === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	} else {
	 if(queryElement[0] === 'author_name') {
		models.Authors.findOne({
			where: {
				name: req.query.author_name
			},
			include: [{
				model: models.Article
			}],
		})
		.then(article => {
			//console.log(article)
			return res.status(200).json({ article });
		})
		.catch (error => {
			return res.status(500).send(error.message);
		})
	} if(queryElement[0] === 'id') {
		models.Authors.findByPk(req.query.id, {
		include: [{
			model: models.Article
		}],
	})
	.then(author => {
		console.log(author)
		return res.status(200).json({ author });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
	}
	}
};

// export controller functions
module.exports = {
	getAuthor
}