var monitor = require('../controllers/monitor');
var fs = require('fs');

test("writes the request", (done) => {
    fs.writeFile(__dirname + "/../store/index.json", "[]");
    monitor.saveReqData({"time": "2018-10-03T14:23:17.105Z"}, "index", (err, result) =>  {
        expect(result).toBe("success");
        fs.readFile(__dirname + "/../store/index.json", (err, data) => {
            expect(JSON.parse(data).length).toBe(1);
            done()
        })
    })
});

test("reads the request", (done) => {
    fs.writeFile(__dirname + "/../store/index.json", "[{\"time\": \"2018-10-03T14:23:17.105Z\"}]");
    monitor.requestsForPaths(["index"], (err, data) => {
        expect(data.length).toBe(1);
        fs.writeFile(__dirname + "/../store/index.json", "[]");
        done();
    })
});