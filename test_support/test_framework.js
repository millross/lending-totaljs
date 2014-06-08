var FUNCTION = "function";

exports.install = function(framework) {

    framework.routes.web = [];

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

        tests.forEach(function(test) {
            test.run(self, "test");
            counter++;
        });

        if (counter === 0) {
            if (cb)  {
                cb();
            }
            if (stop) {
                setTimeout(function() { framework.stop(); }, 500);
            }
            return self;
        }

        setTimeout(function() {
            self.testing(stop, function() {
                self.isTest = false;
                if (cb) {
                    cb();
                }
            });
        }, 10);

        return self;
    };

};

exports.reset = function(framework) {
    framework.modules = {};
    framework.controllers = [];
};

exports.installController = function(framework, controller, name) {
    controller.install(framework, name);
};

exports.installModule = function(framework, module, name) {
    framework.modules[name] = module;
    module.install(framework, name);
};