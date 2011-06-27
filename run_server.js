var sys = require('sys');
var http = require('http');
var app = require('express').createServer();

var networkplan = {};

networkplan['linz'] = {
	"imageUrl": "http://oeffi.schildbach.de/plans/linz.png",
	"networkId": "linz",
	"planId": "linz",
	"entries": [
		{
			"stationId": "123",
			"name": "Schumpeterstrasse",
			"x": 100,
			"y": 200
		},
		{
			"stationId": 456,
			"name": "Hauptbahnhof",
			"x": 124,
			"y": 50
		}
	]
};
networkplan['innsbruck'] = {
	"imageUrl": "http://oeffi.schildbach.de/plans/linz.png",
	"networkId": "innsbruck",
	"planId": "innsbruck",
	"entries": [
		{
			"stationId": "111",
			"name": "Innsbruck Hauptbahnhof",
			"x": 123,
			"y": 321
		}
	]
};
networkplan['graz'] = {
	"imageUrl": "http://oeffi.schildbach.de/plans/linz.png",
	"networkId": "graz",
	"planId": "graz"
};

app.get('/networkplan', function(req, res){
	var networkplanArray = [];
	networkplanArray.push( networkplan['linz'] );
	networkplanArray.push( networkplan['graz'] );
	networkplanArray.push( networkplan['innsbruck'] );
	res.send( networkplanArray );
});

app.get('/networkplan/:city', function(req, res){
	res.send( [ networkplan[req.params.city] ] );
});

app.listen(3000);