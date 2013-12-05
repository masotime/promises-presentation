// fs example 2
// read three files in order and join the contents of the files

var fs = require('fs'),
	files = ['data/data1', 'data/data2', 'data/data3'],
	readFile = fs.readFile, // shortcut
	contents = '';

// must be in series because order matters
// "callback hell" - CPS or Continuous Passing Style
readFile(files[0], 'utf8', function(err, result) {
	if (err) { 
		console.error(err);
	} else {
		contents += result;
		readFile(files[1], 'utf8', function(err, result) {
			if (err) { 
				console.error(err);
			} else {
				contents += result;
				readFile(files[2], 'utf8', function(err, result) {
					contents += result;
					console.log('The joined contents are ', contents);
				});
			};
		});
	};
})