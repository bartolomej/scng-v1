var express = require('express');
var router = express.Router();
var fs = require('fs');
var monitor = require('../controllers/monitor');

router.get('/', (req, res) => {
	monitor.saveReqData(req, 'index', (err, success) => {
		if (err) { console.log(err) }
	});
	res.render('index');
});

router.get('/requests', (req, res) => {
	monitor.requestsForPaths(["index", "download", "report"], (err, result) => {
		if (err) console.log(err)
		res.json(result)
	})
});

router.get('/downloadapp', (req, res, next) => {
	var file = __dirname + '/../public/files/' + 'app-debug.apk';
	monitor.saveReqData(req, 'downloadapp', (err) => {
		if (err) console.log(err)
	});
	res.download(file);
});

router.get('/report', (req, res) => {
	monitor.saveReqData(req, 'report', (err) => {
		if (err) console.log(err)
	});
	res.render('report');
});

router.get('/updates', (req, res) => {
	monitor.saveReqData(req, 'download', (err) => {
		if (err) { console.log(err) } 
	});
	res.render('download', { msg: "Prenesi poskusno Beta verzijo !" } );
});

router.post('/report', (req, res, next) => {
	if (req.body.typenapake === "bugg") {
		fs.readFile('buggs.json', function (err, data) {
		    var json = JSON.parse(data)
		    console.log(json)
		    json.push(req.body)
		    fs.writeFile("buggs.json", JSON.stringify(json, null, 4))
		})
	} else if (req.body.typenapake === "feedback") {
		fs.readFile('feedback.json', function (err, data) {
		    var json = JSON.parse(data)
		    console.log(json)
		    json.push(req.body)
		    fs.writeFile("feedback.json", JSON.stringify(json, null, 4))
		})
	}
	res.render('msg', { msg: "Obrazes uspešno oddan !" } )
});

router.post('/token', (req, res, next) => {
	// beta access tokens
});

module.exports = router;