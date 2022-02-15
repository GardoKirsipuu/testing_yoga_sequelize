// connect to database
const Sequelize = require("sequelize");
const sequelize = new Sequelize('mysql://root:qwerty@localhost:3306/yoga_sequelize');

// read model data for table representation
const Article = require('../models/article')(sequelize, Sequelize.DataTypes);

// get all data from table
const getAllArticles = (req, res) => {
	Article.findAll()
	.then(articles => {
		console.log(articles)
		return res.status(200).json({ articles });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
}

// show article by this slug
const getArticleBySlug = (req, res) => {
	Article.findOne({
		where: {
			slug: req.params.slug
		}
	})
	.then(article => {
		console.log(article)
		return res.status(200).json({ article });
	})
	.catch (error => {
		return res.status(500).send(error.message);
	})
};

// export controller functions
module.exports = {
	getAllArticles,
	getArticleBySlug
}