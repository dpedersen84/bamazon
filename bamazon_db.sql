DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(25) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(100),
    PRIMARY KEY (item_id)
    );
    
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bonzai Tree", "Plants", 25.00, 45);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lamp", "Lighting", 45.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Wireless Headphones", "Electronics", 29.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bratwurst", "Food", 9.99, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Robotic Arm", "Enhancements", 1000.99, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Oriental Rug", "Homegoods",  99.99, 22);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Sony TV", "Electronics", 100.29, 55);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Microsoft Xbox", "Electronics", 200.25, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Lightbulbs", "Lighting", 2.99, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("Bear Mace", "Outdoors", 29.99, 45);

SELECT * FROM products;