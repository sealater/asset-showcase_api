// index.js

// Express Setup
const express = require('express')
const app = express()
const port = 3000

// MySQL Setup
const con = require('./db_connection.js') // con as "connection"

// Database Bridge Setup
const bridge = require('./db_interaction.js')(con);

// Express Middleware
app.use(express.json());
app.use(express.urlencoded());

// API Testing
var i = 0;

app.post('/test', function(req, res) {
	switch (i) {
		case 0: bridge.createAsset("Twibfy", "Artwork site", "Twibfy", "", "https://twibfy.com/"); break;
		case 1: bridge.getAsset(2); break;
		case 2: bridge.updateAsset(2, "Twibfy", "A beautiful artwork site", "John Smith", "", "https://twibfy.com/landing"); break;
		case 3: bridge.createTag("UI"); bridge.createTag("UX"); break;
		case 4: bridge.createAssetTag(2, 1); bridge.createAssetTag(2, 2); break;
		case 5: bridge.deleteAssetTag(2, 2); break;
		case 6: bridge.deleteAsset(2); break;
	}
	i++;
	res.send("~ Response ~");
});

// Asset API Routing
app.post('/asset', function(req, res) {
	var assetName = req.body["assetName"]
	var assetDescription = req.body.assetDescription
	var assetAuthor = req.body.assetAuthor
	var assetLicense = req.body.assetLicense
	var assetSource = req.body.assetSource
	
	if (!assetName || !assetDescription || !assetAuthor || !assetLicense || !assetSource)
		res.end("Not a valid request body.")
	
	bridge.createAsset(assetName, assetDescription, assetAuthor, assetLicense, assetSource, (error, results, fields) => {
		res.send(`Error: ${JSON.stringify(error)}\nResults: ${JSON.stringify(results)}\nFields: ${JSON.stringify(fields)}\n`);
	})
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

