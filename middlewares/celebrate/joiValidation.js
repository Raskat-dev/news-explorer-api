const { celebrate, Joi } = require('celebrate');
const {
  text, link, email, password, name, _id, excessObjects,
} = require('./parametres');

const joiRegistration = celebrate({
  body: Joi.object().options({ abortEarly: false })
    .keys({
      email,
      password,
      name,
    }).messages(excessObjects),
});

const joiLogin = celebrate({
  body: Joi.object().options({ abortEarly: false })
    .keys({ email, password }).messages(excessObjects),
});

const joiGetUser = celebrate({
  body: Joi.object().options({ abortEarly: false }).messages(excessObjects),
});

const joiGetArticles = celebrate({
  body: Joi.object().options({ abortEarly: false }).messages(excessObjects),
});

const joiAddArticle = celebrate({
  body: Joi.object().options({ abortEarly: false }).keys({
    keyword: text, title: text, text, date: text, source: text, link, image: link,
  }).messages(excessObjects),
});

const joiDeleteArticle = celebrate({
  body: Joi.object().options({ abortEarly: false }).messages(excessObjects),
});

module.exports = {
  joiRegistration,
  joiLogin,
  joiGetUser,
  joiGetArticles,
  joiAddArticle,
  joiDeleteArticle,
};
