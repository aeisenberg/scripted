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
 
/*global require exports console*/

var express, app, path, port, host;

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

app.get('/', function (req, res) {
	res.end('Hello World');
});

app.listen(port, host);
console.log("Server 2 has started. ");
