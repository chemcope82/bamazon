DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Toothpaste", "Toiletries", 3.99, 100), 
("Peanut Butter", "Grocery", 5.99, 50),
("Deodorant", "Toiletries", 4.99, 30),
("Running Shoes", "Footwear", 75.25, 20),
("Canned Beans", "Grocery", 1.99, 35),
("High Heels", "Footwear", 125.50, 10),
("Men's T-Shirt", "Apparel", 10.00, 35),
("Women's Jogging Shorts", "Apparel", 20.10, 25),
("52-inch Television", "Electronics", 599.99, 8),
("Emergency Radio", "Electronics", 35.00, 12);

SELECT * FROM products;