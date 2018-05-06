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

// ===================================================================================
// Product Display In Table Format
// ===================================================================================
function displayProducts() {
    connection.query("SELECT * FROM products", function(error, data) {
        console.table(data);
        customerOrder();
    })
};

// ===================================================================================
// Customer Order Screen
// ===================================================================================
function customerOrder() {
    console.log("Welcome to Bamazon!\n");
    connection.query("SELECT * FROM products", function(error, results) {
        if (error) throw error;
        inquirer  
            .prompt ([
                {
                    name: "product",
                    type: "list",
                    choices: function() {
                        let choiceArray = [];
                        for (let i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which product would you like?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "Quantity desired?"
                }
            ])
            .then(function(answer) {
                // get information of the chosen product
                let chosenProduct;
                for (let i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.product) {
                        chosenProduct = results[i];
                        console.log(`\nYou purchased ${answer.quantity} ${chosenProduct.product_name}(s)`);
                        
                        // Determine if sale is successful
                        if (answer.quantity > results[i].stock_quantity) {
                            console.log("Purchase Denied: Insufficient stock quantity")
                            customerOrder();
                        } else {
                            console.log("\nPurchase Successful!");

                            // Calculate total cost of purchase
                            let totalCost = answer.quantity * results[i].price
                            console.log("\nTotal Cost: " + "$" + totalCost + "\n")
                            let newQuantity = (results[i].stock_quantity - answer.quantity)

                            // Update quantities
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [
                                    {
                                        stock_quantity: newQuantity
                                    }, 
                                    {
                                        item_id: chosenProduct.item_id
                                    }
                                ], 
                                function(err, res) {
                                    if (err) throw err;
                                    connection.query("SELECT * FROM products", function(err, res) {
                                        console.table(res);
                                        customerExit();
                                    })
                            });
                        }
                    }
                };
            }); 
    })
};

// ===================================================================================
// End Customer Transaction
// ===================================================================================
function customerExit() {
    console.log("Thank you!");
    connection.end();
};

// ===================================================================================
// To-Do List
// Clean up code
// Add necessary comments
// Research SQL Injections
// ===================================================================================
