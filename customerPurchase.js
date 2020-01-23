//customer purchase logic 
var mysql = require("mysql");
var connection = require("./dbSetUp");
var Purchase = function(id, purchase) {
    this.update = function() {
        connection.query("UPDATE inventory SET quantity=quantity-?,product_sales=product_sales +? WHERE id=?", [purchase, purchase, id], function(err, response) {
            if (err) throw err;
            connection.query("SELECT * FROM inventory WHERE ?", {
                id: id
            }, function(err, response) {
                if (err) throw err;
                console.log('\n', "Thanks for purchasing " + purchase + " of " + response[0].item, '\n',
                    '\n', "We hope to see you again", '\n');
            })
        })
    }
    this.total = function() {
        connection.query("SELECT inventory.price FROM inventory WHERE ?", {
            id: id
        }, function(err, response) {
            if (err) throw err;

            var total = parseFloat(response[0].price) * purchase
            console.log('\n', "Your total is " + total + " dollars", '\n')
        })
    }
}
module.exports = Purchase;