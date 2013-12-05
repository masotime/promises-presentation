// Q versus async
var Q = require('q'),
    async = require('async'),
    fs = require('fs');

var files = ['data/data1', 'data/data2'];
var readFileArgs = files.map(function(val) {
	return [val, 'utf8'];
});

/*
fs.stat('data/data1', function(err, result) {
	console.log('direct fs.stat: ' + JSON.stringify(result));
});

async.map(files, fs.stat, function(err, results) {
	console.log('async: ' + JSON.stringify(results));
});
*/

Array.prototype.qMap = function(callback) {
	// just pass the arguments flat
	var arr = this,
		newarr = [],
		i;

	for (i=0; i < arr.length; i++) {
		var method = Array.isArray(arr[i]) ? 'apply' : 'call';
		newarr[i] = callback[method](null, arr[i]);			
	};

	return newarr;
}

var fs_stat = Q.denodeify(fs.stat);
var fs_readfile = Q.denodeify(fs.readFile);
var promises = files.map(function(value) {
	return fs_stat(value);
});
// console.log(files);
var allTheFiles = files.qMap(fs_readfile);
var singleFile = fs_readfile(files[0], 'utf8');
//console.log(p2);

/*
Q.all(p2).then(function(results) {
	console.log('Q:', results);
})
*/
Q.all(allTheFiles).invoke('toString').then(console.log);

singleFile.then(console.log);

/*
Q.nfcall(fs.readFile, files[0], 'utf8').then(function(result) {
	console.log(result);
});

Q.nfcall(fs.stat, files[0]).then(function(result) {
	console.log(result);
});
*/