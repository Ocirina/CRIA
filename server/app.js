/**
 * Module dependencies.
 */
var express       = require('express'),
    fs            = require('fs'),
    http          = require('http'),
    path          = require('path'),
    routes        = require('./routes'),
    mongoose      = require('mongoose'),
    passport      = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    passwordHash  = require('password-hash');

// Load configuration
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env];

// Bootstrap db connection
var Schema = mongoose.Schema;
mongoose.connect(config.db);


// Bootstrap models
var models_path = __dirname + '/app/models';
var model_files = fs.readdirSync(models_path);
model_files.forEach(function (file) {
    require(models_path + '/' + file)
})

var app = express();
app.configure(function () {
    app.set('port', process.env.PORT || 43083);
    app.set('views', __dirname + '/public');
    
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieParser('design_your_own_iphone_2013'));
    app.use(express.session());
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

app.configure('development', function () {
    app.use(express.errorHandler());
});

// Bootstrap views
//app.get('/', routes.index);
app.get('./routes/routes.js');

http.createServer(app).listen(app.get('port'), function () {
    console.log("Starting server on port: " + app.get('port'));
});

// Bootstrap routes
require('./routes/routes.js')(app);

// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
var User = mongoose.model('User');
var errorMessage = "Incorrecte gebruikersnaam en/of wachtwoord.";

passport.deserializeUser(function (id, done) {
  User.findOne({ _id: id }, function (err, doc) {
      
    if (err) { return done(err);  }
    if (!doc) { return done(null, false, { message: errorMessage }); }
    
    // Create user object
    return done(err, {
      username: doc.name,
      email: doc.email
    });
  });
});

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function (user, done) {
  console.log('serializing');
  console.log('done:', done);
  if (!user && !user.id) {
      user = {};
      user.id = 0;
  }
  done(null, user.id);
});


// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log('passport.use(new LocalStrategy');
        User.findOne({ name: username }, function (err, doc) {
            var hashedPassword = "";
            if (doc && doc.password) {
                hashedPassword = doc.password;
            }
            console.log("hashedPassword: ", hashedPassword);
            console.log("doc: ", doc);
            console.log("err: ", err);
            console.log("password: ", password);
            console.log("passwordHash.verify(password, hashedPassword): ", passwordHash.verify(password, hashedPassword));
            console.log("done): ", done);
            // Verify given password (or empty string) with stored password
            // @see https://github.com/davidwood/node-password-hash/blob/master/README.md
            if (password === "" || !passwordHash.verify(password, hashedPassword)) {
                console.log('xxxx 1');
                doc = {};
                return done(err);
            }

            if (err) {
                console.log('xxxx 2');
                return done(err);
            }
            if (!doc) {
                console.log('xxxx 3');
                return done(null, false, { message: errorMessage });
            }
            console.log('returning...');
            return done(null, doc);
        });
    }
));

// Routes for signin and signout
app.post('/signin', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { 
      return res.send({
        "error": errorMessage,
        "result": null
      }); 
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send({
        "error": null,
        "result": user.name
      });
    });
  })(req, res, next);
});

app.get('/signout', function (req, res) {
  req.logout();
  res.send({
    "error": null,
    "result": "U bent successvol uitgelogd."
  });
});
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
