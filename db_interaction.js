// db_interaction.js

const bridge = function(con) {
	return {
		// Get Asset Tags : asset_id
		getAssetTags: function(values, callback) {
			con.query('SELECT tag.id, tag.name FROM asset_tag INNER JOIN tag ON tag.id = asset_tag.tag_id WHERE asset_tag.asset_id = ?', [ values.assetId ],
				(error, results, fields) => {
					return callback(error, results, fields);
				});
		},
		
		// Get Asset Images : asset_id
		getAssetImages: function(values, callback) {
			con.query('SELECT * FROM asset_image WHERE asset_image.asset_id = ?', [ values.assetId ],
				(error, results, fields) => {
					return callback(error, results, fields);
				});
		},
		
		// Create Asset Tag : assetId, tagId
		createAssetTag: function(values, callback) {
			con.query('INSERT INTO asset_tag(asset_id, tag_id) VALUES(?, ?)', [ values.assetId, values.tagId ], // SQL, Values replacing ?
				(error, results, fields) => { // Query Callback
					return callback(error, results, fields); // Function callback
				});
		},
		// Delete Asset Tag : assetId, tagId
		deleteAssetTag: function(values, callback) {
			con.query('DELETE FROM asset_tag WHERE asset_tag.asset_id = ? AND asset_tag.tag_id = ?', [ values.assetId, values.tagId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		
		// Create Asset Image : assetId, source
		createAssetImage: function(values, callback) {
			con.query('INSERT INTO asset_image(asset_id, source) VALUES(?, ?)', [ values.assetId, values.assetImageSource ],
				(error, results, fields) => {
					return callback(error, results, fields);
				});
		},
		// Delete Asset Image : assetImageId
		deleteAssetImage: function(values, callback) {
			con.query('DELETE FROM asset_image WHERE asset_image.id = ?', [ values.assetImageId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		
		// Create Asset : assetName, assetDescription, assetAuthor, assetLicense, assetSource
		createAsset: function(values, callback) {
			con.query('INSERT INTO asset(name, description, author, license, source) VALUES(?, ?, ?, ?, ?)',  [ values.assetName, values.assetDescription, values.assetAuthor, values.assetLicense, values.assetSource ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Get Asset : assetId
		getAsset: function(values, callback) {
			con.query('SELECT asset.id, asset.name, asset.description, asset.author, asset.license, asset.source, asset.submission_date FROM asset WHERE asset.id = ?', [ values.assetId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Get Assets : quantity
		getAssets: function(values, callback) {
			if (values.quantity) {
				con.query('SELECT * FROM asset ORDER BY asset.id DESC LIMIT ?', [ values.quantity ],
				(error, results, fields) => {
					return callback(error, results, fields);
				});
			}
			else {
				con.query('SELECT * FROM asset ORDER BY asset.id DESC',
				(error, results, fields) => {
					return callback(error, results, fields);
				});
			}
		},
		// Update Asset : assetId, assetName, assetDescription, assetAuthor, assetLicense, assetSource
		updateAsset: function(values, callback) {
			con.query('UPDATE asset SET asset.name = ?, asset.description = ?, asset.author = ?, asset.license = ?, asset.source = ? WHERE asset.id = ?', [ values.assetName, values.assetDescription, values.assetAuthor, values.assetLicense, values.assetSource, values.assetId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Delete Asset : assetId
		// * We must also delete all asset_tag's and asset_image's
		deleteAsset: function(values, callback) {
			con.query('DELETE FROM asset_tag WHERE asset_tag.asset_id = ?', [ values.assetId ],
				(error, results, fields) => {
				con.query('DELETE FROM asset_image WHERE asset_image.asset_id = ?', [ values.assetId ],
					(error, results, fields) => {
					con.query('DELETE FROM asset WHERE asset.id = ?', [ values.assetId ], (error, results, fields) => {
						return callback(error, results, fields);
					});
				});
			});
		},
		
		// Create Tag : tagName
		createTag: function(values, callback) {
			con.query('INSERT INTO tag(name) VALUES(?)', [ values.tagName ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Get Tag : tagId
		getTag: function(values, callback) {
			con.query('SELECT tag.id, tag.name FROM tag WHERE tag.id = ?', [ values.tagId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Update Tag : tagId, tagName
		updateTag: function(values, callback) {
			con.query('UPDATE tag SET tag.name = ? WHERE tag.id = ?', [ values.tagName, values.tagId ],
			(error, results, fields) => {
				return callback(error, results, fields);
			});
		},
		// Delete Tag : tagId
		deleteTag: function(values, callback) {
			con.query('DELETE FROM asset_tag WHERE asset_tag.tag_id = ?', [ values.tagId ],
				(error, results, fields) => {
				con.query('DELETE FROM tag WHERE tag.id = ?', [ values.tagId ], (error, results, fields) => {
						return callback(error, results, fields);
					});
			});
		}
	}
}

module.exports = bridge
