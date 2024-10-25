DROP TABLE IF EXISTS tickets;

CREATE TABLE tickets
(
    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title char(50),
    kategori char(40),
    beskrivning Text NOT NULL,
    create_date TIMESTAMP, 
    update_date TIMESTAMP,
    user char(40),
    agent char(40),
    status char(20) NOT NULL
);


DROP TABLE IF EXISTS files;

CREATE TABLE files (
    id INT NOT NULL,
    file_name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci, 
    file_path VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES tickets(id) ON DELETE CASCADE
);



DROP TABLE IF EXISTS categories;

CREATE TABLE categories
(
    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    category_name VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
    id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_role varchar(255) NOT NULL
);

CREATE TABLE comments
(
    id INT NOT NULL,
    beskrivning Text NOT NULL,
    email VARCHAR(255),
    FOREIGN KEY (id) REFERENCES tickets(id) ON DELETE CASCADE
);

CREATE TABLE knowledge
(
    title char(50),
    email VARCHAR(255),
    kategori VARCHAR(255) NOT NULL,
    problem Text NOT NULL,
    solution Text NOT NULL
);


