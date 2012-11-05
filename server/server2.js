/*******************************************************************************
 * @license
 * Copyright (c) 2012 VMware, Inc. All Rights Reserved.
 * THIS FILE IS PROVIDED UNDER THE TERMS OF THE ECLIPSE PUBLIC LICENSE
 * ("AGREEMENT"). ANY USE, REPRODUCTION OR DISTRIBUTION OF THIS FILE
 * CONSTITUTES RECIPIENTS ACCEPTANCE OF THE AGREEMENT.
 * You can obtain a current copy of the Eclipse Public License from
 * http://www.opensource.org/licenses/eclipse-1.0.php
 *
 * Contributors:
 *     Scott Andrews
 ******************************************************************************/
 
var fs, express, app, path, port, host;

fs = require('fs');
express = require("express");
app = express();

path = process.env.PWD + '/../client';
host = '127.0.0.1';
port = 7262; // 7261

app.configure(function() {
	app.use(app.router);
	app.use(express.static(path));
	app.use(express.errorHandler({
		dumpExceptions: true,
		showStack: true
	}));
});

app.param('accesstoken', function (req, res, next, val, param) {
	// TODO: translate accesstoken value into securepath location
	if (/^[a-f0-9]+$/.test(val)) {
		req.params.accesstoken = val;
		if (true) { // TODO check if access token is valid
			req.params.securepath = '/';
			next();
		}
		else {
			res.status(403);
		}
	}
	else {
		next('route');
	}
});

app.get('/:accesstoken/:file(*)', function (req, res) {
	var file = req.params.securepath + req.params.file;
	res.end(file);
});

app.get('/files/:accesstoken/:file(*)', function (req, res) {
	var file = req.params.securepath + req.params.file;
	fs.stat(file, function (err, stats) {
		if (err) {
			res.status(404);
		}
		else if (stats.isDirectory()) {
			fs.readdir(file, function (err, files) {
				res.type('application/vnd.scripted.directory');
				// TODO include stats/isDirectory/isFile for each file
				res.end(JSON.stringify(files));
			});
		}
		else {
			res.type('application/vnd.scripted.raw');
			res.sendfile(file);
		}
	});
});

app.listen(port, host);
console.log("Server 2 has started. ");
