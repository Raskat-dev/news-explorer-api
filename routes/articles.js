const articleRouter = require('express').Router();
const { joiAddArticle, joiGetArticles, joiDeleteArticle } = require('../middlewares/celebrate/joiValidation');
const { getArticles, addArticle, deleteArticle } = require('../controllers/articles');

articleRouter.post('/', joiAddArticle, addArticle);
articleRouter.get('/', joiGetArticles, getArticles);
articleRouter.delete('/:articleId', joiDeleteArticle, deleteArticle);

module.exports = articleRouter;
