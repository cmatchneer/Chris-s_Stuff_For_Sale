// orders window
var list = require("./list");
var inquirer = require("inquirer");
var mysql = require("mysql");
var connection = require("./dbSetUp");
var AddTo = require("./addTo_db");
var addto = new AddTo();
var deptList = [];


connection.connect(function(err) {
    if (err) throw err;
});
connection.query("SELECT * FROM sections", function(err, response) {
    if (err) throw (err);


    for (var i = 0; i < response.length; i++) {

        deptList.push(response[i].department);
    }

})
console.log(deptList);
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
        choices: ["Check stock levels", "Order more of current stock", "Add new items to the store", "Remove an item from the store"],
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
                    letsWork();

                })
                break;
            case "Add new items to the store":
                console.log("This better be a good item");
                inquirer.prompt([{
                        type: "input",
                        message: "Enter the name of the item you wish to order",
                        name: "item"
                    },
                    {
                        type: "list",
                        choices: deptList,
                        name: "dept"
                    },
                    {
                        type: "number",
                        message: "How much of do you want",
                        name: "quantity"
                    }, {
                        type: "number",
                        message: "How much are we going to charge for this item",
                        name: "price"
                    }
                ]).then(function(response) {
                    addto.newItem(response.item, response.dept, response.quantity, response.price);
                    letsWork();
                })

                break;
            case "Remove an item from the store":
                list();
                inquirer.prompt([{
                    type: "number",
                    message: "Enter the id of the item you with to remove",
                    name: "remove"
                }]).then(function(response) {
                    addto.remove(response.remove);
                    letsWork();
                })
                break;
        }
    })
}
letsWork();