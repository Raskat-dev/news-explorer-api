const { celebrate, Joi } = require('celebrate');
const {
  text, link, email, password, name, _id,
} = require('./parametres');

const joiRegistration = celebrate({
  body: Joi.object()
    .keys({
      email,
      password,
      name,
    }),
});

const joiLogin = celebrate({
  body: Joi.object().keys({ email, password }),
});

const joiGetUser = celebrate({
  body: Joi.object().keys({ _id }),
});

const joiGetArticles = celebrate({
  body: Joi.object().keys({ owner: _id }),
});

const joiAddArticle = celebrate({
  params: Joi.object().keys({
    keyword: text, title: text, text, date: text, source: text, link, image: link,
  }),
});

const joiDeleteArticle = celebrate({
  body: Joi.object().keys({ _id }),
});

module.exports = {
  joiRegistration,
  joiLogin,
  joiGetUser,
  joiGetArticles,
  joiAddArticle,
  joiDeleteArticle,
};
