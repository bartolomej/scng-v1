var express = require('express');
var fs = require('fs');
var router = express.Router();
var v = require('../models/appv');

router.get('/', (req, res) => {
	res.send("Api page");
});

router.get('/version', (req, res) => {
	res.send(v);
});

router.get('/feedback', (req, res) => {
	fs.readFile('feedback.json', function (err, data) {
		var json = JSON.parse(data);
	    res.send(json)
	})
});

router.get('/buggreports', (req, res) => {
	fs.readFile('buggs.json', function (err, data) {
		var json = JSON.parse(data);
	    res.send(json)
	})
});

router.post('/bugreport', (req, res) => {
	var body = req.body;
	console.log(body);
	res.send('Submission successfull !');
});

router.post('/feedback', (req, res) => {
	var body = req.body;
	console.log(body);
	res.send('Submission successfull !');
});

module.exports = router;