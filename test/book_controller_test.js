var assert = require("assert");
var framework = require("total.js");
var http = require("http");
var testFramework = require("../test_support/test_framework");
var book_controller = require("../controllers/book_controller");
var bookDao = require("../test_modules/test_book_dao"); // inject our own book DAO module

// Initialise the framework for injected testing, then we can manage our own injection for individual tests
testFramework.install(framework);

var book_controller_test = {
    run: function(framework, name) {

        console.log('run test: {0}'.format(name));
        console.log('');

        // Documentation: http://docs.totaljs.com/Framework/#framework.assert

        framework.assert('Test URL 1', '/api/', function(error, data, name, code, headers) {
            console.log(code);
            assert.ok(code === 200);
            console.log(data);
            console.log(headers);
            console.log('1');

        });
    }
};

describe ("book_controller", function() {

    describe("getRoot()", function() {
        it ("should return a result", function(done) {
            var FUNCTION = 'function';

            framework.run(http, true, parseInt(process.argv[2]));
            testFramework.reset(framework);
            testFramework.installController(framework, book_controller, "book_controller");
            testFramework.installModule(framework, bookDao, "book_dao");
            console.log(framework.modules);
            console.log("===============");


            framework.test([book_controller_test], true, [], function() {
                console.log('');
                console.log('====================================================');
                console.log('Congratulations, the test was successful!');
                console.log('====================================================');
                console.log('');
                done();
            });
        });
    });

});
