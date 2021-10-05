DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS preview;
DROP TABLE IF EXISTS preview_content;
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

CREATE TABLE tag
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(127) NOT NULL UNIQUE
);

CREATE TABLE preview_content
(
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	source VARCHAR(1023) NOT NULL UNIQUE
);

CREATE TABLE tags
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

CREATE TABLE preview
(
    asset_id INT NOT NULL,
    content_id INT NOT NULL,
    
	FOREIGN KEY (asset_id) REFERENCES asset (id),
	FOREIGN KEY (content_id) REFERENCES preview_content (id),
	
	PRIMARY KEY
	(
		asset_id, content_id
	)
);
