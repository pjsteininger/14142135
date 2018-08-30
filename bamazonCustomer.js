var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1234",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  postItems();
});

function postItems() {
  connection.query("SELECT * FROM products", function (err, queryResult) {
    if (err) throw err;
    var products = [];
    queryResult.forEach((e, i) => products[i] = e.item_id + ": " + e.product_name);
    var num = 30;
    console.log(typeof num.toFixed(2));
    inquirer.prompt([
      {
        name: "product",
        type: "list",
        message: "Select the product you would like to buy.",
        choices: products
      }
    ]).then(function (answer) {
      var itemNum = answer.product.split(":")[0] - 1;
      inquirer.prompt([
        {
          name: "number",
          type: "input",
          message: "The price of this item is $" + queryResult[itemNum].price + "\n  There are " + queryResult[itemNum].stock_quantity + " of this item available. How many would you like to buy?",
        }
      ]).then(function(answer) {
        console.log(answer);
        console.log(answer.number);
        if (isNaN(answer.number) || answer < 0) {
          console.log("Please enter a valid number to purchase")
        } else if (answer.number <= queryResult[itemNum].stock_quantity) {
          console.log("$"+answer.number * queryResult[itemNum].price);
          connection.end();
        } else if (answer.number > queryResult[itemNum].stock_quantity) {
          console.log("Insufficient quantity!");
          connection.end();
        } else {
          console.log("Unknown error");
          connection.end();
        }


      });
    });
  });
}