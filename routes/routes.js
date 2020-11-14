const signRouter = require('./sign');
const userRouter = require('./users');
const articleRouter = require('./articles');
const errorRouter = require('./error');

module.exports = {
  signRouter,
  userRouter,
  articleRouter,
  errorRouter,
};
