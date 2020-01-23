DROP DATABASE IF EXISTS inventory_db;
CREATE DATABASE inventory_db;
USE inventory_db;
CREATE TABLE inventory(
id INTEGER(11) AUTO_INCREMENT NOT NULL,
item VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
quantity INTEGER(11) NULL,
price DECIMAL(11,2) NULL,
product_sales INTEGER(11) NULL,
PRIMARY KEY (id)
);
INSERT INTO inventory(item,department,quantity,price,product_sales)
VALUES 
("Game of Thrones seasons 1-8", "entertainment",50,100.00,10),
("Private Plane", "transport",2,100000.00,0),
("Chairs","furniture",150,15.50,50),
("Black Beans","food",400,1.00,130),
("Russet Potatos","food",500,00.50,0);
CREATE TABLE sections(
id INTEGER (11) AUTO_INCREMENT NOT NULL,
department VARCHAR(50) NOT NULL,
PRIMARY KEY (id)
);
INSERT INTO sections(department)
VALUES
("entertainment"),("transport"),("furniture"),("food");
