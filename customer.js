// var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = require("./dbSetUp");
var list = require("./list");
var purchase = require("./customerPurchase");

var shopper = function() {
    inquirer.prompt([{
        type: "confirm",
        message: "Welcome to Matchneer Industries would you like to shop with us today?",
        name: "shop"
    }]).then(function(response) {
        if (response.shop) {
            list();
            inquirer.prompt([{
                    type: "input",
                    message: "Please enter id of the item you with to buy",
                    name: "userchoice"
                },
                {
                    type: "number",
                    message: "Please enter how much you wish to purchase",
                    name: "quantity"
                }
            ]).then(function(response) {
                console.log(response);
                // purchase(response.userchoice, response.quantity);
            })
        }
        if (!response.shop) {
            console.log("Sorry your broke come back when you have money");
        }
    })
}
shopper();