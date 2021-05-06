DROP DATABASE shopify;
CREATE DATABASE shopify;
USE shopify;

CREATE TABLE user (
    id INT NOT NULL PRIMARY KEY, 
	first_name VARCHAR(255)
);
INSERT INTO user (id, first_name) values (1, "Alice");
INSERT INTO user (id, first_name) values (2, "Bob");

CREATE TABLE image(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
	author_id INT, 
	uri VARCHAR(255),  
	public BOOLEAN, 
	pixels_width INT, 
	pixels_height INT,
	datetime_upload DATETIME,
    CONSTRAINT fk_user
	FOREIGN KEY (author_id)
		REFERENCES user(id)
);
-- INSERT INTO image(
-- 	author_id,
-- 	uri,
-- 	public,
-- 	pixels_width,
-- 	pixels_height,
-- 	datetime_upload)
-- values (
-- 	1,
-- 	'a',
-- 	1,
-- 	100,
-- 	1000,
-- 	'1998-01-23 12:45:56'
-- 	);
-- INSERT INTO image(
-- 	author_id,
-- 	uri,
-- 	public,
-- 	pixels_width,
-- 	pixels_height,
-- 	datetime_upload)
-- values (
-- 	2,
-- 	'b',
-- 	0,
-- 	200,
-- 	2000,
-- 	'2010-12-31 01:15:00'
-- 	);

CREATE TABLE search_term(
	id INT NOT NULL AUTO_INCREMENT,
	term VARCHAR(255),
 	PRIMARY KEY (id),
 	UNIQUE KEY (term)
);
-- INSERT INTO search_term (term) values ('apple');
-- INSERT INTO search_term (term) values ('banana');
-- INSERT INTO search_term (term) values ('carrot');
-- INSERT INTO search_term (term) values ('doritos');

CREATE TABLE images_search_terms(
	id INT NOT NULL AUTO_INCREMENT,
	image_id INT,
	search_term_id INT,
    PRIMARY KEY (id),
    CONSTRAINT unique_join UNIQUE (image_id, search_term_id),
    CONSTRAINT fk_image
	FOREIGN KEY (image_id)
		REFERENCES image(id),
	CONSTRAINT fk_search_term
	FOREIGN KEY (search_term_id)
		REFERENCES search_term(id)
);
-- INSERT INTO images_search_terms(image_id, search_term_id ) values (1, 1);
-- INSERT INTO images_search_terms(image_id, search_term_id ) values (1, 2);
-- INSERT INTO images_search_terms(image_id, search_term_id ) values (2, 2);
-- INSERT INTO images_search_terms(image_id, search_term_id ) values (2, 3);
