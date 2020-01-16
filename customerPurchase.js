//customer purchase logic 
var mysql = require("mysql");
var connection = require("./dbSetUp");

var Purchase = function(id, purchase) {
        this.update = connection.query("UPDATE inventory SET ? WHERE ? OR ?", [{
            quantity: purchase
        }, {
            id: id
        }], function(err, response) {
            if (err) throw err;
            connection.query("SELECT * FROM inventory WHERE ?", {
                id: id
            }, function(err, response) {
                if (err) throw err;
                console.log(response[0].item);
                var total = parseFloat(response[0].price) * purchase
                console.log("Thanks for purchasing " + purchase + " of " + response[0].item, '\n',
                    "Your Total was " + total + " dollars", '\n', "We hope to see you again");
                // connection.end();
            })

        })


    }
    // var purchase = new Purchase(" ", 1, "Chairs");
    // purchase.update;
module.exports = Purchase;