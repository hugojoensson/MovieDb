DROP DATABASE movie;
CREATE DATABASE movie;
USE movie;

CREATE TABLE user (
id int,
PRIMARY KEY (id),
name varchar(255),
password varchar(255)
);
