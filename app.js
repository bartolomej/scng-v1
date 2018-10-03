var bodyParser = require('body-parser');
//var createError = require('http-errors');
var express = require('express');
//var exphb = require('express-handlebars');
var expressValidator = require('express-validator');
var path = require('path');
var handlebars = require('express-handlebars');//.create({ defaultLayout: 'main'});
var indexRoutes = require('./routes/index');
var apiRoutes = require('./routes/api');

var app = express();

switch (app.get('env')) {
	case 'development':
		console.log(app.get('env'))
		app.use(require('morgan')('dev'))
		break;
	case 'production':
		app.use(require('express-logger')({
			path: __dirname + 'log/requests.log'
		}));
		break;
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.enable('view cache');

app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('msg', {
  		message: "Woops! Napaka strani !"
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))

module.exports = app;