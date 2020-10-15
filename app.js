const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const errorRouter = require('./routes/error');
const signRouter = require('./routes/sign');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const auth = require('./middlewares/auth');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: false })); // для приёма веб-страниц внутри POST-запроса

app.use('/', signRouter);
app.use('/users', auth, usersRouter);
app.use('/articles', auth, articleRouter);

app.use('/*', errorRouter);

app.use(errors()); // обработчик ошибок celebrate

app.use((err, req, res, next) => {
  const { name, statusCode = 500, message } = err;
  if (name === 'ValidationError') {
    res.status(400).send({ message });
  } else {
    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }
});

app.listen(PORT, () => {
// Если всё работает, консоль покажет, какой порт приложение слушает
// eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
