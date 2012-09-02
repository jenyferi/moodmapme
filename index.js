//command pallette = command+shift+p
//auto format JS = control+option+f

//SET UP EXPRESS PORT
//
var express = require('express');

var passport = require('passport'),
  TwitterStrategy = require('passport-twitter').Strategy;

var app = express();

var port = process.env.PORT || 5000;

app.listen(port, function() {
  console.log("Listening on " + port);
});

//SET UP EXPRESS LIBRARIES
//
app.configure(function() {
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.session({
    secret: process.env.SECURE_KEY
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
});

//SET UP STATIC FILES
//
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/ui', express.static(__dirname + '/ui'));
app.use('/themes', express.static(__dirname + '/themes'));

app.get('/', function(request, response) {
  response.render('index.ejs', {});
});

//PG
//
var pg = require('pg');

var pgclient = new pg.Client(process.env.DATABASE_URL);

pgclient.connect();

//DATABASE STUFF
//
app.post('/test', function(request, response) {
  var moodnumber = request.body.value;
  console.log(moodnumber);
  response.status(200);
  response.send({
    a: ['json']
  });

  pgclient.query('INSERT INTO test_data VALUES($1)', [moodnumber]);
});

app.post('/test2', function(request, response) {
  response.status(200);
  response.send({
    a: ['json']
  });

  var query = pgclient.query('SELECT * FROM test_data');

  query.on('row', function(row) {
    console.log(JSON.stringify(row.mood_number));
  });
});

//TWITTER STUFF
//
/*passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: "http://www.moodmap.me/callback"
},

function(token, tokenSecret, profile, done) {
  /*console.log({twitterID: profile.id});
  //done(null, null);*/

  /*function (err, user) {
                                         if (err) { return done(err); }
                                         done(null, user);
                                     }*//*
  done(null);
}));

app.get('/graph', passport.authenticate('twitter'));

app.get('/callback', passport.authenticate('twitter', {
  successRedirect: '/graph',
  failureRedirect: '/fail'
}));*/