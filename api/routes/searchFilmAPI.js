var express = require('express');
var router = express.Router();
//Import PythonShell module.
const {PythonShell} =require('python-shell');
const {exec, spawn} = require('child_process');
//const tools = require('./Utils/tools')
//Router to handle the incoming request.
const processFilms = () => {
	var process = spawn('python3',["./python/main.py", "0", capitalizedFirstInput]);
}
router.get('*', function(req, res, next) {
	var capitalizedFirstInput = req.query.input.charAt(0).toUpperCase() + req.query.input.slice(1);

	var process = spawn('python3',["./python/main.py", "0", capitalizedFirstInput]);
	var listResults;
	process.stdout.on('data', (data) => {
		console.log('Child Process STDOUT');
		listResults = JSON.parse(data);
		//listResults.films
		res.send(listResults);

	});
	process.stderr.on('data', (error) => {
		res.send(JSON.parse(error));
	});

	// récupérer les id films, series films et acteurs de listResult pour faire une requête sur chaque id
	// listResults.map((film) => console.log(`test : ${film} \n`))


});

module.exports = router;