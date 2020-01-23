var mysql = require("mysql");
var connection = require("./dbSetUp");

var Manager = function() {
        this.salesCheck = function() {
            connection.query("SELECT SUM(inventory.product_sales) sales, sections.department FROM inventory JOIN sections ON inventory.department=sections.department GROUP BY sections.department",
                function(err, response) {
                    if (err) throw err;
                    for (var i = 0; i < response.length; i++) {
                        console.log('\n', "Department: " + response[i].department + " Total Sales: " + response[i].sales, '\n');
                    }
                })
        }
    }
    // var manager = new Manager();
    // manager.salesCheck();
module.exports = Manager;