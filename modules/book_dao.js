var books = {};

exports.install = function(framework, name) {
    books["1"] = {
        name: "Moby Dick",
        author: "Herman Melville"
    };
    console.log("Installing book database for name " + name);
};

exports.getBooks = function() {
    return Object.keys(books).map(function(key) {
        console.log(books[key]);
        var book =  JSON.parse(JSON.stringify(books[key]));
        book.id = key;
        return book;
    });
};