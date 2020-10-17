module.exports = (err, req, res, next) => {
  const { name, statusCode = 500, message } = err;
  if (name === 'ValidationError') {
    res.status(400).send({ message });
  } else {
    res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  }
};
