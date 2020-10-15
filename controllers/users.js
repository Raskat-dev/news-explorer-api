const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../middlewares/errors/404_not-found.js');
const ConflictError = require('../middlewares/errors/409_conflict.js');

const JWT_SECRET = 'super-secret-key';

// 1. Регистрация пользователя
module.exports.register = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        throw new ConflictError('Пользователь с таким email уже зарегистрирован');
      } else next(err);
    })
    .then(() => res.status(201).send({
      message: `Пользователь ${name} успешно зарегистрирован`,
    }))
    .catch(next);
};

// 2. Вход пользователя на свой аккаунт
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      //! Попробовать через куки
      res.send({ token });
    })
    .catch(next);
};

// 3. Возврат данных авторизированного пользователя
module.exports.getUser = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    //! возможно придется возвращать только email и name через деструктуризацию
    .then((user) => res.send(user))
    .catch(next);
};
