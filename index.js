// index.js

// Express Setup
const express = require('express')
const app = express()
const port = 3000

// MySQL Setup
const con = require('./db_connection.js') // con as "connection"

// Database Bridge Setup
const bridge = require('./db_interaction.js')(con);

/*
app.get('/', (req, res) => {
	connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
		if (error) throw error;
		res.send("SELECT 1 + 1 AS solution -> " + results[0].solution)
	});
	
});
*/

// API Testing
var i = 0;

app.post('/test', function(req, res) {
	switch (i) {
		case 0: console.log(bridge.addTag("Illustratio")); break;
		case 1: console.log(bridge.getTag(4)); break;
		case 2: console.log(bridge.updateTag(4, "Illustration"); break;
		case 3: console.log(bridge.deleteTag(4); break;
	}
	i++;
	res.send("~ Response ~");
});

// Asset API Routing
app.post('/asset', function(req, res) {
	res.send("Create asset")
});

app.route('/asset/:assetId')
	.get(function (req, res) {
		res.send("Get asset " + req.params["assetId"]);
	})
	.put(function (req, res) {
		res.send("Update asset " + req.params["assetId"]);
	})
	.delete(function (req, res) {
		res.send("Delete asset " + req.params["assetId"]);
	});
	
// Tag API Routing
app.post('/asset/tags', function(req, res) {
	res.send("Create tag")
});

app.route('/asset/tags/:tagId')
	.get(function (req, res) {
		res.send("Get tag " + req.params["tagId"]);
	})
	.put(function (req, res) {
		res.send("Update tag " + req.params["tagId"]);
	})
	.delete(function (req, res) {
		res.send("Delete tag " + req.params["tagId"]);
	});

// Open UNIX socket
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})

