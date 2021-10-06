DROP TABLE IF EXISTS asset_tag;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS asset_image;
DROP TABLE IF EXISTS asset;

CREATE TABLE asset
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(127), 
	description VARCHAR(255) NOT NULL,
	author VARCHAR(127),
	license VARCHAR(255),
	source VARCHAR(1023) NOT NULL,
	submission_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE asset_image
(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	asset_id INT NOT NULL,
    source VARCHAR(1023) NOT NULL,
    
	FOREIGN KEY (asset_id) REFERENCES asset (id)
);

CREATE TABLE tag
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(127) NOT NULL UNIQUE
);

CREATE TABLE asset_tag
(
    asset_id INT NOT NULL,
    tag_id INT NOT NULL,
    
	FOREIGN KEY (asset_id) REFERENCES asset (id),
	FOREIGN KEY (tag_id) REFERENCES tag (id),
	
	PRIMARY KEY
	(
		asset_id, tag_id
	)
);

INSERT INTO asset (name, description, author, source) VALUES ('Ant Design', 'Comprehensive design guidelines, best practices, resources, and tools to help designers produce high-quality product prototypes.', 'Ant Design', 'https://ant.design/docs/spec/introduce') 
