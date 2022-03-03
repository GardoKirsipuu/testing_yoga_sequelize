const express = require('express');
// get using express router
const router = express.Router();
// define API controller and export it to this file
const apiArticleController = require('../controllers/api/article');
const apiAuthorController = require('../controllers/api/author');

// use controller functions according to the route
router.get('/article', apiArticleController.getArticle);
router.get('/author', apiAuthorController.getAuthor);

// export article router for using in default application file
module.exports = router;