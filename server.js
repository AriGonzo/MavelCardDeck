//Server Dependencies-----------------------------------------------------
var express = require('express');
var app = express();
var server = require('http').Server(app);
var PORT = process.env.PORT || 9090;
var path = require('path');
var _ = require('underscore');
//-----------------------------------------------------------------

var records = require('require-all')(__dirname + '/records');
var result = [];

for(var i in records){
    result.push(records[i]);
}

result.sort(function (a, b) { 
	if(a.images.background == null){
		a.images.background = "http://i.annihil.us/u/prod/marvel/i/mg/6/90/537ba2184e75f.gif"
	}
	return b.ranking.comicCount - a.ranking.comicCount || b.ranking.pageviewCount - a.ranking.pageviewCount; 
});

var removedDupes = _.uniq(result, 'superName')


app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/fullList', function(req, res){
	var page = req.query.page || 0;
	var first = page * 40;
	var last = first + 40;
	res.send(removedDupes.slice(first, last));
});

//Middleware-------------------------------------------------------
app.use(express.static('public'));
//-----------------------------------------------------------------


//Turning on Server------------------------------------------------
server.listen(PORT, function(){
	console.log("listening on", PORT)
});
//-----------------------------------------------------------------

