const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const usersRoutes = require('./routes/users');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/rest-api-example', {
  useMongoClient: true
}).then(db => console.log('db is connected'))
  .catch(err => console.log(err));

// settings
app.set('port', process.env.PORT || 3000);

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// routes
app.use('/users', usersRoutes);

// start the server
app.listen(app.get('port'), () => {
  console.log('server on port ', app.get('port'));
});