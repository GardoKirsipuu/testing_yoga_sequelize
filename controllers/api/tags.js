// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/yoga_sequelize');

// read model data for table representation
const models = require('../../models')

// show article by this slug
const getTags = (req, res) => {
	let queryElement = Object.keys(req.query)
	if(Object.keys(req.query).length === 0){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.tag_name === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.id === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	} else {
	 if(queryElement[0] === 'tag_name') {
		models.Tags.findOne({
			where: {
				name: req.query.tag_name
			},
			include: [{
				model: models.Article
			}],
		})
		.then(tags => {
			//console.log(article)
			return res.status(200).json({ tags });
		})
		.catch (error => {
			return res.status(500).send(error.message);
		})
	} if(queryElement[0] === 'id') {
		models.Tags.findByPk(req.query.id, {
		include: [{
			model: models.Article
		}],
	})
	.then(tags => {
		//console.log(tags)
		return res.status(200).json({ tags });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
	}
	}
};

// export controller functions
module.exports = {
	getTags
}