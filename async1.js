// async 1
// async to the rescue
'use strict';

var async = require('async'),
	fs = require('fs'),
	files = ['data/data1', 'data/data2', 'data/data3'],
	//files = ['data/data1', 'xxdata/data2', 'data/data3'],
	contents;

// find size of 3 files and get the total size
//*
function adder(sum, current) {
	return sum + current.size; /// note the ".size"
}

async.map(files, fs.stat, function sumSizes(err, results) {
	if (err) {
		console.error(err);
	} else {
		console.log('sum of all file sizes = ', results.reduce(adder, 0));
	}
});
/* */

// join the contents of 3 files

// "waterfall"
/*
contents = '';

async.waterfall([
	function(cb) {
		fs.readFile(files[0], 'utf8', cb);
	},
	function(content1, cb) {
		contents += content1;
		fs.readFile(files[1], 'utf8', cb);
	},
	function(content2, cb) {
		contents += content2;
		fs.readFile(files[2], 'utf8', cb);
	},
	function(content3, cb) {
		contents += content3;
		cb(null, contents);
	}
], function(err, result) {
	if (err) { console.error(err) };
	console.log('[waterfall] joined contents:', result);
});
/* */

// map then reduce

/*

// mapping function
function myReadFile(file, callback) {
	fs.readFile(file, 'utf8', function(err, fileContents) {
		callback(err, fileContents);
	});
};

// reducing function
function contentJoiner(joinedSoFar, currentContents) {
	return joinedSoFar + currentContents;
};

contents = '';

async.map(files, myReadFile, function joinContents(err, results) {
	if (err) { console.error(err) };
	console.log('[map/reduce] joined contents:', results.reduce(contentJoiner, ''));
});
/* */

// method 3, series
/*
contents = '';
async.series([
	function(cb) {
		myReadFile(files[0], cb);
	},
	function(cb) {
		myReadFile(files[1], cb);
	},
	function(cb) {
		myReadFile(files[2], cb);
	}
], function(err, results) {
	if (err) { console.error(err) };
	console.log('[series] joined contents:', results.reduce(contentJoiner, ''));
});
/* */