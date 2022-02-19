const express = require('express');
// get using express router
const router = express.Router();
// define article controller and export it for this file
const authorController = require('../controllers/author');

// use controller functions according to the route
router.get('/:id', authorController.getArticlesByAuthor);

// export article router for using in default application file
module.exports = router;