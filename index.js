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

// Validate Posted Values
function validPost(values) {
	Object.keys(values).forEach(function(key, index) {
		if (values[key] == undefined) {
			return false;
		}
	});
	
	return true;
}

// Interact with the database via database bridge
function bridgeAction(action, values, res) {
	if (!validPost(values)) {
		return res.end("Invalid request body.");
	}
	
	action(values, (error, results, fields) => {
		if (error !== null) {
			return res.end(JSON.stringify(error));
		}
		
		return res.end(JSON.stringify(results));
	});
}

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
	const values = {
		assetName: req.body.assetName,
		assetDescription: req.body.assetDescription,
		assetAuthor: req.body.assetAuthor,
		assetLicense: req.body.assetLicense,
		assetSource: req.body.assetSource
	}
	
	bridgeAction(bridge.createAsset, values, res);
});

app.route('/asset/:assetId')
	.get(function (req, res) {
		const values = {
			assetId: req.params.assetId,
		}
		
		bridgeAction(bridge.getAsset, values, res);
	})
	.put(function (req, res) {
		const values = {
			assetId: req.params.assetId,
			assetName: req.body.assetName,
			assetDescription: req.body.assetDescription,
			assetAuthor: req.body.assetAuthor,
			assetLicense: req.body.assetLicense,
			assetSource: req.body.assetSource
		}
		
		bridgeAction(bridge.updateAsset, values, res);
	})
	.delete(function (req, res) {
		const values = {
			assetId: req.params.assetId,
		}
		
		bridgeAction(bridge.deleteAsset, values, res);
	});
	
// Tag API Routing
app.post('/asset/tags', function(req, res) {
	const values = {
		tagName: req.body.tagName
	}
	
	bridgeAction(bridge.createTag, values, res);
});

app.route('/asset/tags/:tagId')
	.get(function (req, res) {
		const values = {
			tagId: req.params.tagId,
		}
		
		bridgeAction(bridge.getTag, values, res);
	})
	.put(function (req, res) {
		const values = {
			tagId: req.params.tagId,
			tagName: req.body.tagName,
		}
		
		bridgeAction(bridge.updateTag, values, res);
	})
	.delete(function (req, res) {
		const values = {
			tagId: req.params.tagId,
		}
		
		bridgeAction(bridge.deleteTag, values, res);
	});
	
// Asset Tag API Routing
app.post('/asset/:assetId/tags/:tagId', function(req, res) {
	const values = {
		assetId: req.params.assetId,
		tagId: req.params.tagId
	}
	
	bridgeAction(bridge.createAssetTag, values, res);
});

app.route('/asset/:assetId/tags/:tagId')
	.delete(function (req, res) {
		const values = {
			assetId: req.params.assetId,
			tagId: req.params.tagId
		}
		
		bridgeAction(bridge.deleteTag, values, res);
	});
	
// Get Assets' Tags
app.get('/asset/:assetId/tags/', function(req, res) {
	const values = {
		assetId: req.params.assetId,
	}
	
	bridgeAction(bridge.getAssetTags, values, res);
});
	
// Asset Image API Routing
app.post('/asset/:assetId/images/', function(req, res) {
	const values = {
		assetId: req.params.assetId,
		assetImageSource: req.body.assetImageSource
	}
	
	bridgeAction(bridge.createAssetImage, values, res);
});

app.route('/asset/:assetId/images/:assetImageId')
	.delete(function (req, res) {
		const values = {
			assetId: req.params.assetId,
			assetImageId: req.params.assetImageId
		}
		
		bridgeAction(bridge.deleteAssetImage, values, res);
	});
	
// Get Assets' Images
app.get('/asset/:assetId/images/', function(req, res) {
	const values = {
		assetId: req.params.assetId,
	}
	
	bridgeAction(bridge.getAssetImages, values, res);
});

// Open UNIX socket
app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`)
})

