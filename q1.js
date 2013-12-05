// Rewrite with Q
var fs = require('fs'),
	Q = require('q'),
	// files = ['data/data1', 'data/datxxa2', 'data/data3'];
	files = ['data/data1', 'data/data2', 'data/data3'];

var useThirdFileSize = function(size) {
	console.log('the third files size is ', size);
}

var useFileStats = function(stats) {
	console.log('stats for files');
	stats.forEach(function(stat, index) {
		console.log(index,':',JSON.stringify(stat));
	});
}

// this converts a "callback function" into a "promise function" that returns a promise
var fs_stat = Q.denodeify(fs.stat); 

var statPromises = files.map(function(file) {
	return fs_stat(file);
}); // array of promises

// for all the files - when all promises are resolved
Q.all(statPromises)
	.then(useFileStats)
	.done(undefined, function(err) {
		console.error('problem trying to stat all files', err); // localized error handling
	});

// for only the third file
statPromises[2]
	.then(function(stat) {
		return stat.size;
	})
	.then(useThirdFileSize)
	.done();

// shortcut:
// statPromises[2].get('size').then(useThirdFileSize);
