# bamazon #
This is a simulated marketplace app using MySQL and node.js.

To start, clone the repo with the package.json, navigate to the repository in command line, and "npm install" to install the required node packages (mysql and inquirer).

Once the packages are finished installing, the program can be run, but to run properly, the database must be initialized first.

To initialize the database, run the MySQL query titled "bamazonQuery" in MySQL workbench.

After the database is initialized, run the program by typing "node bamazonCustomer" in command line. It will prompt you with the items for sale, and allow you to select which one you would like purchase. After selecting, it will give you the unit price and ask for an amount to buy. After entering the amount, it will calculate the total price and print that out in command line.