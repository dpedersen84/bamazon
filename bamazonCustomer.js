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
    displayTable();
  });

  function displayTable() {
    connection.query("SELECT * FROM products", function(error, data) {
        console.log("\nWelcome to Bamazon!\n");
        console.table(data);
        updateData();
    })
  };

  function startPrompt() {
    inquirer
        .prompt ([
            {
                name: "id",
                type: "input",
                message: "What is the product ID?"
            },
            {
                name: "quantity",
                type: "input",
                message: "Quantity desired?"
            }
        ])
        .then(function(answer) {
            console.log("\n" + "Item ID: " + answer.id);
            console.log("Quantity purchased: " + answer.quantity + "\n");

            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id], function(error, data) {
                console.table(data);
            })
        })
  };

  function createData() {

  };

  function updateData() {
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
                        
                        // For loop to determine sale successful
                        if (answer.quantity > results[i].stock_quantity) {
                            console.log("Purchase Denied: Insufficient stock quantity")
                        } else {
                            console.log("Purchase Successful");

                            // calculate total cost of purchase
                            let totalCost = answer.quantity * results[i].price
                            console.log("Total Cost of purchase: " + "$" + totalCost)
                        }
                    }
                };
            }); 

    })// end of connection query
  };// end of function updateData

  function deleteData() {

  };

  function readData() {

  };