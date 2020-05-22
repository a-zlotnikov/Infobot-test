const express = require('express');
const useMiddleware = require('./middleware');
const path = require('path');
const publicPath = path.join(__dirname, 'public');

const app = express()
useMiddleware(app)

const phonesRouter = require('./routes/phones')

app.use('/phones', phonesRouter)

app.use(express.static(publicPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

module.exports = app
