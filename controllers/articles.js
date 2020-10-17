const Article = require('../models/article');
const NotFoundError = require('../middlewares/errors/404_not-found.js');
const ForbiddenError = require('../middlewares/errors/403_forbidden.js');

// 1. Возврат статей, сохраненных пользователем
module.exports.getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => res.send(articles))
    .catch(next);
};

// 2. Добавление статьи в избранное
module.exports.addArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const ownerId = req.user._id;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then((article) => res.send(article))
    .catch(next);
};

// 3. Удаление статьи из избранного
module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    .orFail(new NotFoundError('Нет статьи с таким id'))
    .then((article) => {
      if (article.owner.toString() !== req.user._id) {
        throw new ForbiddenError('У Вас нет прав для удаления этой статьи');
      }
      Article.findByIdAndDelete(req.params.articleId)
        .then(() => res.send({ message: 'Статья успешно удалена' }));
    })
    .catch(next);
};
