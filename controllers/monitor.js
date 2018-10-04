var fs = require('fs');
var util = require('util');
var async = require('async');

module.exports.saveReqData = function(req, filename, callback) {
	fs.readFile(__dirname + "/../store/" + filename + '.json', function (err, data) {
        var json;
		if (err) {
			callback("error")
		}
		try {
            json = JSON.parse(data)
			console.log("file data: " + json.toString())
        } catch (e) {
			console.log(e)
			callback("error")
		}
		var reqObj = {
			ip: req.ip,
			url: req.path,
			time: new Date()
		};
		json.push(reqObj);
		console.log("json" + json.toString())
		try {
            fs.writeFile(__dirname + "/../store/" + filename + ".json", JSON.stringify(json, null, 4));
        } catch (e) {
			callback("error")
        }
		callback(null, 'success')
	})
};

module.exports.requestsForPaths = function(filenames, callback) {
    var array = [];
    async.forEachOf(filenames, (value, key, callback) => {
    	fs.readFile(__dirname + "/../store/" + value + '.json', 'UTF-8', (err, data) => {
    		try {
				array.push(JSON.parse(data));
            } catch (e) {
				callback(e)
            }
            callback()
		})
	}, (err) => {
    	if (err) {
    		callback(err)
		}
		console.log("callback exec " + array);
		callback(null, array)
	})
};