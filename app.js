const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const winston = require('./config/winston');

const morgan = require('morgan');
require('./config/passport');

const routes = require('./routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', '/images/icon/favicon.ico')));
app.use(morgan('combined', { stream: winston.stream }));

// required for passport
app.use(session({
  secret: 'imajinz', // session secret
  resave: true,
  store: new RedisStore(),
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes(passport));
// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
