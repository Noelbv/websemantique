var express = require('express');
var router = express.Router();
//Import PythonShell module.
const {PythonShell} =require('python-shell');
const {exec, spawn} = require('child_process');
//const tools = require('./Utils/tools')
//Router to handle the incoming request.
router.get('*', function(req, res, next) {
	var capitalizedFirstInput = req.query.input.charAt(0).toUpperCase() + req.query.input.slice(1);

	var process = spawn('python3',["./python/main.py", "0", capitalizedFirstInput]);

	process.stdout.on('data', (data) => {
		console.log('Child Process STDOUT');
		res.send(JSON.parse(data));
	});
	process.stderr.on('data', (error) => {
		res.send(JSON.parse(error));
	});


});

module.exports = router;