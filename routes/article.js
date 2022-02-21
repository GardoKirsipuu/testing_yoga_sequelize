const express = require('express');
// get using express router
const router = express.Router();
// define article controller and export it for this file
const articleController = require('../controllers/article');
const articleAdminController = require('../controllers/admin/article')

// use controller functions according to the route
router.get('/', articleController.getAllArticles);
router.get('/article/:slug', articleController.getArticleBySlug);

router.post('/admin/article/create', articleAdminController.createArticle);

// export article router for using in default application file
module.exports = router;