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
        startPrompt();
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

  };

  function deleteData() {

  };

  function readData() {

  };