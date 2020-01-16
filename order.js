// orders window
var list = require("./list");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = require("./dbSetUp");
var AddTo = require("./addTo_db");
var addto = new AddTo();
connection.connect(function(err) {
    if (err) throw err;
});
var letsWork = function() {
    inquirer.prompt([{
        type: "confirm",
        message: "Hello are you ready to work",
        name: "start"
    }]).then(function(response) {
        if (response.start) {
            job();
        }
        if (!response.start) {
            console.log("Well now that you are off the clock have fun");
        }
    })
}
var job = function() {
    inquirer.prompt([{
        type: "list",
        message: "What kind of work are we doing today",
        choices: ["Check stock levels", "Order more of current stock", "Add new items to the store"],
        name: "jobType"
    }]).then(function(response) {
        switch (response.jobType) {
            case "Check stock levels":
                addto.list();

                job();
                break;
            case "Order more of current stock":
                list();
                inquirer.prompt([{
                        type: "number",
                        message: "Enter id of the item you wish to order",
                        name: "id"
                    },
                    {
                        type: "number",
                        message: "How much of this product would you like to order",
                        name: "order"
                    }
                ]).then(function(response) {
                    addto.update(response.id, response.order);
                    inquirer.prompt([{
                        type: "confirm",
                        message: "Do you have more work to do?",
                        name: "moreWork"
                    }]).then(function(response) {
                        if (response.moreWork) {
                            job();
                        }
                        if (!response.moreWork) {
                            console.log("Good work today see you later");
                        }
                    })

                })
                break;
            case "Add new items to the store":
                break;
        }
    })
}
letsWork();