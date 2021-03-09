-- Create a table to store user accounts in.
CREATE TABLE accounts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	email VARCHAR(50) NOT NULL,
	name VARCHAR(50) NOT NULL,
	password VARCHAR(30) NOT NULL,
	CONSTRAINT emailUnique UNIQUE (email)
);
-- Create a dummy account for testing.
INSERT INTO accounts (email, name, password) VALUES ("mail@mail.com", "Peppe","abc123");