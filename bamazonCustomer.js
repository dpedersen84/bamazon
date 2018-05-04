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
        console.log("\nWelcome to Bamazon!\n");
        console.table(data);
        customerOrder();
    })
};

function customerOrder() {
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
                // console.table(results);

                // get information of the chosen product
                let chosenProduct;
                for (let i = 0; i < results.length; i++) {

                    if (results[i].product_name === answer.product) {
                        chosenProduct = results[i];
                        console.table(chosenProduct)
                        
                        // Determine if sale is successful
                        if (answer.quantity > results[i].stock_quantity) {
                            console.log("Purchase Denied: Insufficient stock quantity")
                            customerOrder();

                        } else {
                            console.log("Purchase Successful!");

                            // calculate total cost of purchase
                            let totalCost = answer.quantity * results[i].price
                            console.log("Total Cost: " + "$" + totalCost)

                            // update quantities
                            // connection.query(
                            //     "UPDATE products SET ? WHERE ?",
                            //     [
                            //         {
                            //             stock_quantity: answer.quantity
                            //         }, 
                            //         {
                            //             id: chosenProduct.id
                            //         }
                            //     ], 
                            //     function(err) {
                            //         if (err) throw err;
                                
                            // }
                            customerExit();
                        }
                    }
                };
            }); 
    })// end of connection query
};

function customerExit() {
    console.log("Thank you!");
    connection.end();
};