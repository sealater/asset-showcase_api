// db_interaction.js

const bridge = function(con) {
	return {
		// Create Tag : tagName
		createTag: function(tagName) {
			con.query('INSERT INTO tag(name) VALUES(?)', [ tagName ],
			(error, results, fields) => {
				if (error) throw error;
				return JSON.stringify(results);
			});
		}
		// Get Tag : tagId
		getTag: function(tagId) {
			con.query('SELECT tag.id FROM tag WHERE tag.id = ?', [ tagId ],
			(error, results, fields) => {
				if (error) throw error;
				return results;
			});
		}
		// Update Tag : tagId, tagName
		updateTag: function(tagId, tagName) {
			con.query('UPDATE tag SET tag.name = ? WHERE tag.id = ?', [ tagName, tagId ],
			(error, results, fields) => {
				if (error) throw error;
				return results;
			});
		}
		// Delete Tag : tagId
		deleteTag: function(tagId) {
			con.query('DELETE FROM tag WHERE tag.id = ?', [ tagId ],
			(error, results, fields) => {
				if (error) throw error;
				return results;
			});
		}
	}
}

module.exports = bridge
/*
con.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
	if (error) throw error;
	console.log('The solution is: ', results[0].solution;
});
*/
