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

/*var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
    var query = client.query('SELECT * FROM your_table');
           
    query.on('row', function(row) {
        console.log(JSON.stringify(row));
    });
});*/