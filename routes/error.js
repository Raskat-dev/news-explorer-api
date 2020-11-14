const errorRouter = require('express').Router();
const NotFoundError = require('../middlewares/errors/404_not-found');

errorRouter.all('/*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = errorRouter;
