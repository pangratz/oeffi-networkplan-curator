var sys = require('sys');
var http = require('http');
var app = require('express').createServer();

var networkplan = {};

networkplan['linz'] = {
	"imageUrl": "http://oeffi.schildbach.de/plans/linz.png",
	"imageWidth": 1114,
	"imageHeight": 1618,
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
networkplan['bonn'] = {
	"imageUrl": "http://oeffi.schildbach.de/plans/bonn_schnellverkehr.png",
	"imageWidth": 2338,
	"imageHeight": 1653,
	"networkId": "bonn",
	"planId": "bonn"
};

app.get('/networkplan', function(req, res){
	var networkplanArray = [];
	networkplanArray.push( networkplan['linz'] );
	networkplanArray.push( networkplan['bonn'] );
	res.send( networkplanArray );
});

app.get('/networkplan/:city', function(req, res){
	res.send( [ networkplan[req.params.city] ] );
});

app.listen(3000);