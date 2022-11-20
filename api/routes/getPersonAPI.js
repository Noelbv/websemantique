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
		args: ["5", req.query.id] //An argument which can be accessed in the script using sys.argv[1]
	};
	console.log('request: ', req.query.id);
	PythonShell.run('main.py', options, function (err, result){
		try  {
			res.send(JSON.parse(result))
			console.log("JSON PARSED");
			
		} catch(error) {
			res.send(error);
		}
		// result is an array consisting of messages collected
		//during execution of script.
		console.log('result:',result);

	});
});

module.exports = router;