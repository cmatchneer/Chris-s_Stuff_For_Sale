var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = require("./dbSetUp");
var list = require("./list");
connection.connect(function(err) {
    if (err) throw err;

});
var shopper = function() {
    inquirer.prompt([{
        input: "confirm",
        message: "Welcome to Matchneer Industries would you like to shop with us today?",
        name: "shop"
    }]).then(function(response) {
        if (response.shop) {
            list();
        }
    })
}
shopper();