var express = require('express');
var router = express.Router();
//Import PythonShell module.
const {PythonShell} =require('python-shell');

//Router to handle the incoming request.
router.get('*', function(req, res, next) {
	let options = {
		mode: 'text',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: './python', //If you are having python_test.py script in same folder, then it's optional.
		pythonPath: './python/api-env/Scripts/python.exe',
		args: [0, req.query.input] //An argument which can be accessed in the script using sys.argv[1]
	};

	PythonShell.run('main.py', options, function (err, result){
		console.log("exec python en cours...");
		if (err) throw err;
		// result is an array consisting of messages collected
		//during execution of script.
		//console.log('result: ', JSON.parse(result));
		res.send(JSON.parse(result))
	});
});

module.exports = router;