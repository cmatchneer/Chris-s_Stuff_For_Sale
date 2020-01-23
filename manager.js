var StoreData = require("./storeData");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = require("./dbSetUp");
var AddTo = require("./addTo_db");
var addTo = new AddTo();
var storeData = new StoreData();
connection.connect(function(err) {
    if (err) throw err;
});
var work = function() {
    inquirer.prompt([{
        type: "confirm",
        message: "Welcome boss are you ready to work",
        name: "ready"
    }]).then(function(response) {
        if (response.ready) {
            inquirer.prompt([{
                type: "list",
                message: "What kind of work are we doing today",
                choices: ["Sales totals", "Add new department"],
                name: "job"
            }]).then(function(response) {
                switch (response.job) {
                    case "Sales totals":
                        storeData.salesCheck();
                        work();
                        break;
                    case "Add new department":
                        inquirer.prompt([{
                            type: "input",
                            message: "What is the name of this new department",
                            name: "dept"
                        }]).then(function(response) {
                            addTo.newDept(response.dept);
                            work();
                        })
                }
            })
        }
        if (!response.ready) {
            console.log("Enjoy the rest of your day");
            connection.end();
        }
    })
}
work();