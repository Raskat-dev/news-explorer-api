const signRouter = require('express').Router();
const { joiLogin, joiRegistration } = require('../middlewares/celebrate/joiValidation');
const { register, login } = require('../controllers/users');

signRouter.post('/signup', joiRegistration, register);
signRouter.post('/signin ', joiLogin, login);

module.exports = signRouter;
