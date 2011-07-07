var sys = require('sys');
var http = require('http');
var express = require('express');
var app = express.createServer();
app.use(express.bodyParser());

var CouchClient = require('couch-client');
var oeffinpc = new CouchClient('http://localhost:5984/oeffinpc');

app.get('/networkplans', function(req, res){
	oeffinpc.view('/oeffinpc/_design/oeffinpc/_view/all_networkplans', {}, function(err, doc){
		var networkPlans = doc.rows.map(function(val){
			return val.value;
		});
		res.send(networkPlans);
	});
});

app.put('/networkplans/:key', function(req, res){
	res.send('ok');
});

app.post('/networkplans/:key', function(req, res){
	var body = req.body;
	var key = req.params.key;
	body['_id'] = undefined;
	body['networkPlanKey'] = key;
	body['x'] = body.x ? body.x : 0;
	body['y'] = body.y ? body.y : 0;
	oeffinpc.save(body, function(err, doc){
		res.send(doc);
	});
});

app.get('/networkplans/:key', function(req, res){
	var key = req.params.key;
	oeffinpc.view('/oeffinpc/_design/oeffinpc/_view/all_networkplans?key="'+key+'"', {}, function(err, doc){
		var rows = doc.rows;
		if (rows && rows.length == 1) {
			var networkPlan = rows[0].value;
			oeffinpc.view('/oeffinpc/_design/oeffinpc/_view/all_networkplanentries?key="'+key+'"', {}, function(err, doc){
				if (doc && doc.rows) {
					networkPlan['entries'] = doc.rows.map(function(val){
						return val.value;
					});
				}
				res.send(networkPlan);
			});
			return;
		}
		res.send(null);
	});
});

app.get('/networkplans/:key/_entries', function(req, res){
	var key = req.params.key;
	oeffinpc.view('/oeffinpc/_design/oeffinpc/_view/all_networkplanentries?key="'+key+'"', {}, function(err, doc){
		if (doc && doc.rows) {
			var entries = doc.rows.map(function(val){
				return val.value;
			});
			res.send(entries);
		}
	});
});

app.get('/networkplanentries/:key', function(req, res){
	var key = req.params.key;
	oeffinpc.view('/oeffinpc/_design/oeffinpc/_view/networkplanentry?key="'+key+'"', {}, function(err, doc){
		var rows = doc.rows;
		if (rows) {
			res.send(rows[0].value);
		}
		res.send(null);
	});
});

app.put('/networkplanentries/:key', function(req, res){
	var body = req.body;
	var key = req.params.key;
	oeffinpc.save(body, function(err, doc){
		res.send(doc);
	});
});

app.del('/networkplanentries/:key', function(req, res){
	var key = req.params.key;
	oeffinpc.remove(key, function(err, doc){
		res.send(doc);
	});
});

app.listen(3000);