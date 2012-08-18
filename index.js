var express = require('express');

var app = express();

var port = process.env.PORT || 5000;

app.use(express.bodyParser());

app.get('/', function(request, response) {
    response.render('index.ejs', {});
});

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/ui', express.static(__dirname + '/ui'));
app.use('/themes', express.static(__dirname + '/themes'));

app.post('/test', function (request, response) {
    console.log(request.body);
    response.status(200)
    response.send({a: ['json']})
});

app.listen(port, function() {
    console.log("Listening on " + port);
});

var OAuth= require('oauth').OAuth;

var oa = new OAuth(
   "https://api.twitter.com/oauth/request_token",
   "https://api.twitter.com/oauth/access_token",
   process.env.TWITTER_CONSUMER_KEY,
   process.env.TWITTER_CONSUMER_SECRET,
   "1.0",
   "http://moodmap.me/graph",
   "HMAC-SHA1"
);

app.get('/', function(req, res){
    oa.getOAuthRequestToken(function(error, oauth_token, oauth_token_secret, results){
        if (error) {
            console.log(error);
            res.send("yeah no. didn't work.");
        }
        else {
            req.session.oauth = {};
            req.session.oauth.token = oauth_token;
            console.log('oauth.token: ' + req.session.oauth.token);
            req.session.oauth.token_secret = oauth_token_secret;
            console.log('oauth.token_secret: ' + req.session.oauth.token_secret);
            res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
        }
    });
});

app.get('/graph', function(req, res, next){
    if (req.session.oauth) {
        req.session.oauth.verifier = req.query.oauth_verifier;
        var oauth = req.session.oauth;

        oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier,function(error, oauth_access_token, oauth_access_token_secret, results){
           if (error){
               console.log(error);
               res.send("yeah something broke.");
           } else {
               req.session.oauth.access_token = oauth_access_token;
               req.session.oauth,access_token_secret = oauth_access_token_secret;
               console.log(results);
               res.send("worked. nice one.");
           }
        });
    }
    else {
        next(new Error("you're not supposed to be here."));
    }
});

/*var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
    var query = client.query('SELECT * FROM your_table');
           
    query.on('row', function(row) {
        console.log(JSON.stringify(row));
    });
});*/