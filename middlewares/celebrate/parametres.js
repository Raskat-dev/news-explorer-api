const { Joi } = require('celebrate');

// const keyword = Joi
//   .string()
//   .required()
//   .messages({
//     'string.base': 'keyword должно быть строкой',
//     'any.required': 'keyword - обязательное поле',
//   });

// const title = Joi
//   .string()
//   .required()
//   .messages({
//     'string.base': 'title должно быть строкой',
//     'any.required': 'title - обязательное поле',
//   });

// const text = Joi
//   .string()
//   .required()
//   .messages({
//     'string.base': 'text должно быть строкой',
//     'any.required': 'text - обязательное поле',
//   });

// const date = Joi
//   .string()
//   .required()
//   .messages({
//     'string.base': 'date должно быть строкой',
//     'any.required': 'date - обязательное поле',
//   });

const text = Joi
  .string()
  .required()
  .messages({
    'string.base': '{#label} должно быть строкой',
    'any.required': '{#label} - обязательное поле',
  });

const link = Joi
  .string()
  .required()
  .uri()
  .messages({
    'string.base': '{#label} должно быть строкой',
    'string.uri': '{#label} должно быть url',
    'any.required': '{#label} - обязательное поле',
  });

// const image = Joi
//   .string()
//   .required()
//   .uri()
//   .messages({
//     'string.base': 'image должно быть строкой',
//     'string.uri': 'image должно быть url',
//     'any.required': 'image - обязательное поле',
//   });

const _id = Joi
  .string()
  .required()
  .hex()
  .messages({
    'string.base': '_id должно быть строкой',
    'string.hex': '_id должно быть hex-строкой',
    'any.required': '_id - обязательное поле',
  });

const email = Joi
  .string()
  .required()
  .email()
  .messages({
    'string.email': 'Некорректный email адрес',
    'any.required': 'email - обязательное поле',
  });

const password = Joi
  .string()
  .required()
  .min(6)
  .messages({
    'string.base': 'password должен быть строкой',
    'string.min': 'Минимальное количество символов password: 6',
    'any.required': 'email - обязательное поле',
  });

const name = Joi
  .string()
  .required()
  .min(2)
  .max(30)
  .messages({
    'string.base': 'name должно быть строкой',
    'string.min': 'Минимальное количество символов name: 2',
    'string.max': 'Максимальное количество символов name: 30',
    'any.required': 'keyword - обязательное поле',
  });

module.exports = {
  text,
  link,
  email,
  password,
  name,
  _id,
};
