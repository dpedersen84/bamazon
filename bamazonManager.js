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
    managerView();
});

function managerView() {
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
                    displayProducts();
                    break;

                    case "View Low Inventory":
                    console.log("Viewing Low Inventory...");
                    lowInventory();
                    break;

                    case "Add to Inventory":
                    console.log("Adding Inventory...");
                    addInventory();
                    break;

                    case "Add New Product":
                    newProduct();
                }
                
            })
    })
};

function displayProducts() {
    connection.query("SELECT * FROM products", function(error, data) {
        console.log("Viewing Products...\n");
        // console.log("\nWelcome Boss!\n");
        console.table(data);
        // productView();
    })
};

function lowInventory() {
    connection.query("SELECT * FROM products ")
}

function newProduct() {
    inquirer
        .prompt([
            {
                name: "product",
                type: "input",
                message: "Product?"
            },
            {
                name: "department",
                type: "input",
                message: "Department?"
            },
            {
                name: "price",
                type: "input",
                message: "Price?"
            },
            {
                name: "stock",
                type: "input",
                message: "Starting stock?"
            },
        ])
        .then(function(answer) {
            console.log("\nAdding Product...\n");
            connection.query("INSERT INTO products SET ?",
                {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stock
                },
                function(err, res) {
                console.log(res.affectedRows + " product(s) added!\n");
                displayProducts();
                }
            )
        })
};

function addInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        inquirer    
            .prompt([
                {
                    name: "product",
                    type: "list",
                    message: "Which product would you like to add inventory to?",
                    choices: function() {
                        let choiceArray = [];
                        for (let i = 0; i < res.length; i++) {
                            choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much inventory would you like to add?"
                }
            ])
            .then(function(answer){
                console.log(answer);
            })
    })
    
}