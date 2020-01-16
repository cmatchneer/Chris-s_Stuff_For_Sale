var connection = require("./dbSetUp");
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

});