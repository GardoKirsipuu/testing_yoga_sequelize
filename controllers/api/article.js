// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/yoga_sequelize');

// read model data for table representation
const models = require('../../models')

// show article by this slug
const getArticle = (req, res) => {
	let queryElement = Object.keys(req.query)
	if(Object.keys(req.query).length === 0){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.q === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	}else if(req.query.id === ''){
		return res.status(400).json({ 'error': 'Invalid request'});
	} else {
	 if(queryElement[0] === 'q') {
		models.Article.findOne({
			where: {
				slug: req.query.q
			},
			include: [{
				model: models.Authors
			},
			{
				model: models.Tags,
				through: {
					model: models.ArticleTags
				}
			}
			],
		})
		.then(article => {
			//console.log(article)
			return res.status(200).json({ article });
		})
		.catch (error => {
			return res.status(500).send(error.message);
		})
	} if(queryElement[0] === 'id') {
		models.Article.findByPk(req.query.id, {
		include: [{
			model: models.Authors
		},
		{
			model: models.Tags,
			through: {
				model: models.ArticleTags
			}
		}
		],
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ article });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
	}
	}
};

// export controller functions
module.exports = {
	getArticle
}