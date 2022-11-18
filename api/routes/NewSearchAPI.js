var express = require('express');
var router = express.Router();
//Import PythonShell module.
const {PythonShell} =require('python-shell');
const {exec} = require('child_process');
//Router to handle the incoming request.
router.get('*', function(req, res, next) {

	const pyth = exec('python3 ./python/main.py 0 Harry', function (error, stdout, stderr) {

		if (error) {
		  console.log(error.stack);
		  console.log('Error code: ' + error.code);
		  console.log('Signal received: ' + error.signal);
		  res.send(JSON.parse(error));
		}
		console.log('Child Process STDOUT: ' + stdout);
		res.send(JSON.parse(stdout));
        
	  });
	// pyth.on('close', function (code) {
	// 	console.log('Child process exited with exit code ' + code);
	//   });

});

module.exports = router;