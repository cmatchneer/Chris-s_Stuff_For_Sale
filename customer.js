//customer window
var list = require("./list");
var Purchase = require("./customerPurchase");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = require("./dbSetUp");
connection.connect(function(err) {
    if (err) throw err;
});
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
                var purchase = new Purchase(response.userchoice, response.quantity);
                purchase.total();
                inquirer.prompt([{
                    type: "confirm",
                    message: "Do you wish to continue",
                    name: "continue"
                }]).then(function(response) {
                    if (response.continue) {
                        purchase.update();
                    }
                    if (!response.continue) {
                        shopper();
                    }
                })
            })
        }
        if (!response.shop) {
            console.log("Sorry your broke come back when you have money");
            connection.end();
        }
    })
}
shopper();