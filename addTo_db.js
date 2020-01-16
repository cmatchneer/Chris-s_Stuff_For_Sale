//orderer being able to add to quantity of a product or add a new product to the table
var mysql = require("mysql");
var connection = require("./dbSetUp");
var AddTo = function() {
        this.update = function(searchID, orderAmount) {
            connection.query("UPDATE inventory SET ? WHERE ?", [{
                    quantity: orderAmount
                },
                {
                    id: searchID
                }
            ], function(err, res) {
                if (err) throw err;
                console.log('\n\n', "The order has been placed")
            })
        }
        this.list = function() {
            connection.query("SELECT * FROM inventory ORDER BY quantity ASC", function(err, response) {
                if (err) throw err;
                for (var i = 0; i < response.length; i++) {
                    console.log('\n\n', "Item id: " + response[i].id + "    Item Name: " + response[i].item + "     Quantity: " + response[i].quantity + "      Price: " + response[i].price, '\n\n');
                }
            })
        }
    }
    // var addto = new AddTo();
    // addto.update(1, 10);
    // addto.list();
module.exports = AddTo;