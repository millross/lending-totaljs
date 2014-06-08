var assert = require("assert");

exports.run = function(framework, name) {

    console.log("run test: {0}".format(name));
    console.log("");

    // Documentation: http://docs.totaljs.com/Framework/#framework.assert

    framework.assert("Test URL 1", "/", function(error, data, name, code, headers) {
        assert.ok(code === 200);
        console.log(data);
        console.log("1");

    });
};
