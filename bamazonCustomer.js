var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});

connection.connect(function(err){
    if(err) throw err;
    // console.log("Connected as id " + connection.threadId);
    shopping();
});

function shopping(){
    connection.query("SELECT * FROM products", function(err, res){
        if(err) throw err;
        console.table(res);
        console.log("");
        inquirer.prompt([
            {
                message: "Enter the item_id of the product you would like to buy",
                name: "item_id"
            },
            {
                message: "How many units would you like to buy?",
                name: "units"
            }
        ]).then(function(answer){
            var chosenItem = {};

            for(i=0; i<res.length; i++) {
                if (parseInt(answer.item_id) === res[i].item_id) {
                    chosenItem = res[i];
                }
            }
            if (chosenItem.stock_quantity >= answer.units) {
                connection.query("UPDATE products SET ? WHERE ?",
                [            
                    {
                        stock_quantity : chosenItem.stock_quantity - parseInt(answer.units)
                    },
                    {
                        item_id : parseInt(answer.item_id)
                    }
                ], function(err, res){
                    if(err) throw err;
                    console.log("\n\n Thank you for your purchase!\n\n Your total cost is $" + parseInt(answer.units)*chosenItem.price + "\n\n\n");
                    shopping();
                })
            } else {
                console.log("\n\n ======= Sorry, insufficient quantity! ======= \n\n\n");
                shopping();
            }
        })
    });
}