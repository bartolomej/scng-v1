var example = require('../controllers/example');
var jest = require('jest');

test("Expect true if sum > 10", () => {
    expect(example.exampleFun(2, 3)).toBe(5);
    expect(example.exampleFun(5, 6)).toBe(true);
})