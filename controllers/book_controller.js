function apiRoot() {

    var self = this;
    self.json(self.module("book_dao").getBooks());

}

function newBook() {

    var self = this;
    var model = self.post;
    console.log(model);
    self.json({result: true});
}


// Must be defined in each controller
exports.install = function(framework, name) {

    // this place is for definition routes (HTTP, CUSTOM STATIC FILES, WEBSOCKETS)
    // http://docs.totaljs.com/Framework/#framework.route
    framework.route("/api/", apiRoot);
    framework.route("/api/book/", newBook, ["json", "post"]);

};

