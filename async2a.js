// What if I want to re-use a result elsewhere?
'use strict';

var fs = require('fs'),
	async = require('async'),
	files = ['data/data1', 'data/data2', 'data/data3'];

function useThirdFileSize(size) {
	console.log('the third files size is ', size);
}

function useFileStats(stats) {
	console.log('stats for files');
	stats.forEach(function(stat, index) {
		console.log(index,':',JSON.stringify(stat));
	});
}

// first approach - naive - files[2] is stat'd TWICE
async.map(files, fs.stat, function(err, stats) {
	useFileStats(stats);
});

fs.stat(files[2], function(err, stat) {
	useThirdFileSize(stat.size);
});