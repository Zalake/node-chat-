var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var chatRouter = require('./routes/chat');
var loginRouter = require('./routes/login');
var app = express();
var port = process.env.PORT||3000;
var server = require('http').Server(app).listen(port,function(err,success){
  console.log("server running");
});
var io = require('socket.io').listen(server);
app.use(function(req,res,next){
  req.io = io;

  next();
});
io.on('connection', function(socket){
     
      socket.on('chatData',function(data){
        console.log(data);

        socket.emit('mssg',data);
      });
});

app.use(session({
    secret:"qwerty",
    resave:true,
    cookie:true,
    saveUninitialized:false
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/chat', chatRouter);
app.use('/login', loginRouter);
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
  res.render('error');
});

module.exports = app;
