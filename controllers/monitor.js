var fs = require('fs');
var util = require('util');
var async = require('async');

module.exports.saveReqData = function(req, url, filename, callback) {
    var json;
	fs.readFile(filename + '.json', function (err, data) {
		if (err) {
			callback(err)
		}
		try {
            json = JSON.parse(data)
        } catch (e) {
			json = JSON.parse('[' + data + ']')
        }

		    console.log(util.inspect(json));
		var reqObj = {
			ip: req.ip,
			url: url,
			time: new Date()
		};
		json.push(reqObj);
		fs.writeFile(filename + ".json", JSON.stringify(json, null, 4));
		callback(null, 'success')
	})
};

module.exports.numOfReqForPaths = function(filenames, callback) {
    var array = []; // how to pass this array to upper callback
    async.forEachOf(filenames, (value, key, callback) => {
    	fs.readFile(value + '.json', 'UTF-8', (err, data) => {
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