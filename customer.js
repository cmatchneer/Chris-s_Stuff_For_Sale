// var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = require("./dbSetUp");
var list = require("./list");

var shopper = function() {
    inquirer.prompt([{
        type: "confirm",
        message: "Welcome to Matchneer Industries would you like to shop with us today?",
        name: "shop"
    }]).then(function(response) {
        if (response.shop) {
            list();
        }
        if (!response.shop) {
            console.log("Sorry your broke come back when you have money");
        }
    })
}
shopper();