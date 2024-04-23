DROP DATABASE movie;
CREATE DATABASE movie;
USE movie;

CREATE TABLE user (
id int,
PRIMARY KEY (id),
name varchar(255),
password varchar(255)
);



CREATE TABLE movie (
id INT NOT NULL AUTO_INCREMENT,
PRIMARY KEY (id),
title varchar(255),
release_year YEAR,
watch_date DATE,
movie_length TIME,
rating int
);
