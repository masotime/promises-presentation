// async 1
// async to the rescue
var async = require('async'),
	fs = require('fs'),
	files = ['data/data1', 'data/data2', 'data/data3'];

// find size of 3 files and get the total size
var adder = function(sum, current) {
	return sum + current.size; /// note the ".size"
}

async.map(files, fs.stat, function sumSizes(err, results) {
	if (err) {
		console.log(err);
	} else {
		console.log('sum of all file sizes = ', results.reduce(adder, 0 /* initial value */));
	}
});

// join the contents of 3 files
// method 1, "series"

// cover if I have time

// method 2, map then reduce
var contents = '';

var myReadFile = function(file, callback) {
	fs.readFile(file, 'utf8', function(err, fileContents) {
		callback(null, fileContents); // skip error checking for brevity
	})
}

var contentJoiner = function(joinedSoFar, currentContents) {
	return joinedSoFar + currentContents;
}

async.map(files, myReadFile, function joinContents(err, results) {
	console.log('joined contents = ' + results.reduce(contentJoiner, '' /* initial value */));
});