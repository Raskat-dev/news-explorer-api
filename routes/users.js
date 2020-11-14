const userRouter = require('express').Router();
const { joiGetUser } = require('../middlewares/celebrate/joiValidation');
const { getUser } = require('../controllers/users');

userRouter.get('/me', joiGetUser, getUser);

module.exports = userRouter;
