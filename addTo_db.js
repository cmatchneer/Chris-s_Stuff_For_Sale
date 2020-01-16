var mysql = require("mysql");
var connection = require("./dbSetUp");
connection.connect(function(err) {
    if (err) throw err;

});
var addTo = function(searchID, name, orderAmount) {
    connection.query("UPDATE inventory SET ? WHERE ? OR ?", [{
            quanity: quanity + orderAmount
        },
        {
            id: searchID
        },
        {
            item: name
        }
    ], function(err, res) {
        if (err) throw err;
        console.log(res);
    })
}
addTo();