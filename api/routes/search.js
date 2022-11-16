//fichier utilitaire pour les services
// création des requests options
// fonctions get/save/create/delete

// EXEMPLE OPTIONS REQUETE API (headers)
// const getRequestOptionsGoogleAPI = (method = "GET") => ({
//   method,
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "fetch",
//   },
// });




const express=require('express');
const app=express();

//Import PythonShell module.
const {PythonShell} =require('python-shell');

//Router to handle the incoming request.
router.get('/', function(req, res, next) {
	let options = {
		mode: 'text',
		pythonOptions: ['-u'], // get print results in real-time
		scriptPath: './src/python', //If you are having python_test.py script in same folder, then it's optional.
		args: ['search', req.titre] //An argument which can be accessed in the script using sys.argv[1]
	};

	PythonShell.run('main.py', options, function (err, result){
		if (err) throw err;
		// result is an array consisting of messages collected
		//during execution of script.
		console.log('result: ', JSON.parse(result));
		res.send(JSON.parse(result))
	});
});

module.exports = router;