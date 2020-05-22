module.exports = function(app) {
  const express = require('express');
  const morgan = require('morgan');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb+srv://admin:1234Qwer@nd-test-j4ciw.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  app.use(morgan('dev'));

  app.use(express.urlencoded({extended: true}));
  app.use(express.json());
};
