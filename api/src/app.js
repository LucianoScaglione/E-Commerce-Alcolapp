const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//RUTAS//
const productsRouter = require('./routes/Products');
const usersRouter = require('./routes/Users');
const paymentsRouter = require('./routes/Payments');
const ordersRouter = require('./routes/Orders');
const favoritesRouter = require('./routes/Favorites');
const commentsRouter = require('./routes/Comments');
////////

require('./db.js');

const server = express();

server.name = 'API';

server.use(express.static('public'))
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
server.use('/products', productsRouter);
server.use('/', usersRouter);
server.use('/payments', paymentsRouter);
server.use('/orders', ordersRouter);
server.use('/users', usersRouter);
server.use('/favorites', favoritesRouter);
server.use('/comments', commentsRouter);
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;