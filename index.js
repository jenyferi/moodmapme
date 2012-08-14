var express = require('express');

var app = express();

var ejs = require('ejs');

var port = process.env.PORT || 5000;

app.listen(port, function() {
    console.log("Listening on " + port);
});

app.get('/', function(request, response) {
    response.render('index.ejs', {});
});

/*var pg = require('pg');

pg.connect(process.env.DATABASE_URL, function(err, client) {
           /*var query = client.query('SELECT * FROM your_table');
           
           query.on('row', function(row) {
                    console.log(JSON.stringify(row));
                    });
           });*/