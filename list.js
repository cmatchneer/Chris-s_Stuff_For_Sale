var mysql = require("mysql");
var connection = require("./dbSetUp");

var list = function() {
    connection.query("SELECT * FROM inventory", function(err, response) {
        if (err) throw err;
        for (var i = 0; i < response.length; i++) {


            console.log('\n\n', "Item id: " + response[i].id + "    Item Name: " + response[i].item + "     Quantity: " + response[i].quantity + "      Price: " + response[i].price, '\n\n');

        }
        // connection.end();
    })

}


module.exports = list;