const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "", // change me when done testing
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
});

function displayProducts() {
    connection.query("SELECT * FROM products", function(error, data) {
        console.log("\nWelcome Boss!\n");
        console.table(data);
        productView();
    })
};

function productView() {
    connection.query("SELECT * FROM products", function (error, results) {
        if (error) throw error;
        inquirer
            .prompt ([
                {
                    name: "action",
                    type: "list",
                    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
                    message: "What would you like to do?"
                }
            ])
            .then(function(answer) {

                let action = answer.action;

                switch (action) {

                    case "View Products for Sale":
                    console.log("Viewing Products...");
                    break;

                    case "View Low Inventory":
                    console.log("Viewing Low Inventory...");
                    break;

                    case "Add to Inventory":
                    console.log("Adding Inventory...");
                    break;

                    case "Add New Product":
                    console.log("Adding Product...");
                }
                
            })










    })

}