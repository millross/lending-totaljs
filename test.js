var framework = require("total.js");
var http = require("http");
var bookController = require("./controllers/book_controller");
var assert = require("assert");

var bookControllerTest = {
    run: function(framework, name) {

        console.log("run test: {0}".format(name));
        console.log("");

        // Documentation: http://docs.totaljs.com/Framework/#framework.assert

        framework.assert("Test URL 1", "/", function(error, data, name, code, headers) {
            assert.ok(code === 200);
            console.log(data);
            console.log(headers);
            console.log("1");

        });
    }
};

var FUNCTION = "function";

framework.run(http, true, parseInt(process.argv[2]));
framework.routes.web = [];
bookController.install(framework, "book_controller");

// Let"s let the framework test itself with our test
framework.test = function(tests, stop, names, cb) {

    var self = framework;

    if (typeof(names) === FUNCTION) {
        cb = names;
        names = [];
    } else {
        names = names || [];
    }

    var counter = 0;
    self.isTest = true;

    console.log("Have just set isTest");
    tests.forEach(function(test) {
        test.run(self, "test");
        counter++;
    });

    console.log("COUNTER = " + counter);
    if (counter === 0) {
        if (cb) { cb(); }
        if (stop) {
            setTimeout(function() {
                console.log("HERE");
                framework.stop();
            }, 500);
        }
        return self;
    }

    console.log("About to set timeout");

    setTimeout(function() {
        console.log("HERE2");
        self.testing(stop, function() {
            self.isTest = false;
            if (cb) {
                cb();
            }
        });
    }, 100);

    return self;
};

framework.test([bookControllerTest], true, [], function() {
    console.log("");
    console.log("====================================================");
    console.log("Congratulations, the test was successful!");
    console.log("====================================================");
    console.log("");
});