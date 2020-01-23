//orderer being able to add to quantity of a product or add a new product to the table
var mysql = require("mysql");
var connection = require("./dbSetUp");
var AddTo = function() {
        this.update = function(searchID, orderAmount) {
            connection.query("UPDATE inventory SET quantity=quantity +? WHERE id= ?", [orderAmount, searchID], function(err, res) {
                if (err) throw err;
                console.log('\n\n', "The order has been placed")
            })
        }
        this.list = function() {
            connection.query("SELECT * FROM inventory ORDER BY quantity ASC", function(err, response) {
                if (err) throw err;
                for (var i = 0; i < response.length; i++) {
                    console.log('\n', "Item id: " + response[i].id + "    Item Name: " + response[i].item + "     Quantity: " + response[i].quantity + "      Price: " + response[i].price + "      Sales: " + response[i].product_sales, '\n');
                }
            })
        }
        this.newItem = function(name, dept, amount, cost) {
            connection.query("INSERT INTO inventory SET ?", {
                item: name,
                department: dept,
                quantity: amount,
                price: cost
            }, function(err, response) {
                if (err) throw err;
                console.log('\n\n', name + " is now added to our store inventory");
            })
        }
        this.newDept = function(dept) {
            connection.query("INSERT INTO sections SET ?", {
                department: dept
            }, function(err, response) {
                if (err) throw err;
                console.log(dept + " had been added to our store now lets order some inventory for " + dept);
            })
        }
        this.remove = function(input) {
            connection.query("DELETE FROM inventory WHERE ?", {
                id: input
            }, function(err, response) {
                if (err) throw err;
                console.log('\n\n', "You better have been right about removing that item")
            })
        }
    }
    // var addto = new AddTo();
    // addto.newItem("Plate", "Kitchen Goods", 180, 5);
    // addto.update(1, 10);
    // addto.list();
    // addto.remove(5);
    // addto.newDept("video games");
module.exports = AddTo;