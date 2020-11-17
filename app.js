// для загрузки JWT_SECRET в переменную окружения
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./middlewares/celebrate/errorHandler'); // обработка ошибок celebrate без вложенности
const {
  signRouter, userRouter, articleRouter, errorRouter,
} = require('./routes/routes');
const auth = require('./middlewares/auth');
const error = require('./middlewares/errors/error');
const rateLimit = require('./middlewares/rateLimit');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors({ origin: true }));

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: false })); // для приёма веб-страниц внутри POST-запроса

app.use(requestLogger); // подключаем логгер запросов

app.use(helmet()); // для простановки security-заголовков для API
app.use(rateLimit); // для ограничения числа запросов

app.use('/', signRouter);
app.use('/users', auth, userRouter);
app.use('/articles', auth, articleRouter);

app.use('/*', errorRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorHandler); // обработчик ошибок celebrate с выводом нужной ошибки

app.use(error);

app.listen(PORT);
