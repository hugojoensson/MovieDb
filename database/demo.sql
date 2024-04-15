USE movie;

INSERT INTO user (id, name, password) VALUES (1, "oden", MD5("abc123"));

SELECT * FROM user;