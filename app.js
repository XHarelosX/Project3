var express = require('express');
var util = require('util');
var path = require('path');
var router = express.Router();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bcryptjs = require('bcryptjs');
var mongoose = require('mongoose');
var userModule = require('./ServerJS/User-Schema-model');
var expressValidator = require('express-validator');
var session = require('express-session');
var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/NewdataBase', function (err) {
    if (err) {
        return console.log(err);
    } else {
        console.log("All Good Brother! :)")
    }
});
var index = require('./routes/index');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//-----------------------------------------------------------------
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.'),
            root = namespace.shift(),
            formParam = root;
        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}))
app.use('/', index);
app.use(session({
    secret: '!#$$%^$^&$&^BfdrtymnbcxV',
    resave: false,
    saveUninitialized: true
}))
//-----------------------------------------------------------------
app.post('/Register', function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var confirm = req.body.confirm;

    console.log({
        receivedUser: req.body
    });

    // Validation
    req.checkBody('firstName', 'firstName is required').notEmpty();
    req.checkBody('lastName', 'lastName is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);

    req.getValidationResult().then(function (result) {
        if (!result.isEmpty()) {
            console.log('There have been validation errors: ' + util.inspect(result.array()));
            res.status(404).send();
            return;
        } else {
            var newUser = new userModule.User(req.body);
            userModule.createUser(newUser, function (err, user) {
                if (err) throw err;
                console.log(user);
            });
        };
        res.send("Thank You for Register!");
    });
});
//-----------------------------------------------------------------
app.post('/loginServer', function (req, res) {
    var emailToFind = req.body.email;
    var password = req.body.password;
    console.log({
        receivedUser: req.body
    });
    userModule.User.collection.findOne({
        email: emailToFind
    }, function (err, user) {
        if (user == false || user == null) {
            return res.status(404).send();
        }
        if (err) {
            return res.status(404).send();
        } else {
            var hashedPass = user.password;
            bcryptjs.compare(req.body.password, hashedPass, function (err, result) {
                if (result) {
                    console.log(result + " password match!");
                    console.log(req.session)
                    res.cookie('userEmail', emailToFind);
                    console.log(req.cookies);
                    req.session.isLoggedIn = true;
                    return res.send()
                }
                if (result == false) {
                    return res.status(404).send('Password Does not match');
                } else {
                    console.log(result);
                    return res.status(404).send('You need to login');
                }
            });
        }

    });
});
//-----------------------------------------------------------------
app.get('/api/CheckIfLogin', function (req, res) {
    console.log(req.session.isLoggedIn);
    res.json(!!req.session.isLoggedIn);
})
//-----------------------------------------------------------------
app.post('/addNewVideo', function (req, res) {
    var userEmail = req.cookies.userEmail;
    var newVideo = new userModule.Video(req.body);
    userModule.User.collection.update({
        email: userEmail
    }, {
        $push: {
            videos: req.body
        }
    });
    res.send('the video add to db, but pls check!');
});
//-----------------------------------------------------------------
app.get('/getVideos', function (req, res) {
    var userEmail = req.cookies.userEmail;
    userModule.User.collection.find({
        email: userEmail
    }).toArray(function (err, data) {
        res.send(data[0].videos);
    });
});
//-----------------------------------------------------------------
app.get('/logout', function (req, res) {
    req.session.isLoggedIn = false;
    res.clearCookie('userEmail');
    return res.send();
});
//-----------------------------------------------------------------
app.post('/updateVideo', function (req, res) {
    var userEmail = req.cookies.userEmail
    var newVideo = new userModule.Video(req.body);
    console.log(req.body);
    userModule.User.collection.update({
        email: userEmail,
        'videos.ID': req.body.ID
    }, {
        $set: {
            'videos.$.name': req.body.name,
            'videos.$.desc': req.body.desc,
            'videos.$.category': req.body.category,
        }
    });
    userModule.User.collection.find({
        email: userEmail
    }).toArray(function (err, data) {
        console.log(data[0].videos);
    });

    res.send('the video was edited');
});
//-----------------------------------------------------------------
function makeSureUserIsLoggedIn(req, res, next) {
    if (!req.session.isLoggedIn) {
        res.redirect('/');
        return;
    }
    next();
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


module.exports = app;