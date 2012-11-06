var fs = require('fs');

exports.install = function (app) {

	app.get('/editor/:path(*)', function (req, res) {
		var filepath = '/' + req.params.path;
		res.header('Content-Type', 'text/html');
		fs.createReadStream(process.env.PWD + '/../client/editor.html').pipe(res);
	});

};
