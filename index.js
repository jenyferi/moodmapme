var express = require('express');

var passport = require('passport'),
TwitterStrategy = require('passport-twitter').Strategy;

var app = express();

var port = process.env.PORT || 5000;

app.configure(function () {
              app.use(express.cookieParser());
              app.use(express.bodyParser());
              app.use(express.session({
                                      secret: process.env.SECURE_KEY
                                      }));
              app.use(passport.initialize());
              app.use(passport.session());
              app.use(app.router);
              });

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/ui', express.static(__dirname + '/ui'));
app.use('/themes', express.static(__dirname + '/themes'));

app.get('/', function (request, response) {
        response.render('index.ejs', {});
        });

var moodnumber;

app.post('/test', function (request, response) {
         moodnumber = request.body;
         console.log(moodnumber);
         response.status(200);
         response.send({
                       a: ['json']
                       });
         });

app.listen(port, function () {
           console.log("Listening on " + port);
           });

passport.use(new TwitterStrategy({
                                 consumerKey: process.env.TWITTER_CONSUMER_KEY,
                                 consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
                                 callbackURL: "http://www.moodmap.me/callback"
                                 },
                                 
                                 function (token, tokenSecret, profile, done) {
                                     /*function (err, user) {
                                         if (err) { return done(err); }
                                         done(null, user);
                                     }*/
                                     done(null);
                                 }));

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
// /auth/twitter/callback
app.get('/graph', passport.authenticate('twitter'));

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/callback',
        passport.authenticate('twitter', {
                              successRedirect: '/graph',
                              failureRedirect: '/fail'
                              }));

var pg = require('pg');
 
pg.connect(process.env.DATABASE_URL, function(err, client) {
    console.log('pg connected');
           var query = client.query('INSERT INTO products (test_data) VALUES (' + );
 
    //query.on('row', function(row) {
    //console.log(JSON.stringify(row));
    //});
});