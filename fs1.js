// fs example 1
// fs.stat returns an object with a "size" property
'use strict';

var fs = require('fs'),
	files = ['data/data1', 'data/data2', 'data/data3'];

// find the size of 3 files - parallel
files.forEach(function(file, idx) {
	fs.stat(file, function(err, result) {
		if (err) {
			console.error('error getting size of file', file, ' - ', err);
		} else {
			console.log('size of ',file,' = ',result.size);
		}
	});
});