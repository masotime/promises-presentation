// What if I want to re-use a result elsewhere?
'use strict';

var fs = require('fs'),
	async = require('async'),
	files = ['data/data1', 'data/datxxa2', 'data/data3'];
	// files = ['data/data1', 'data/data2', 'data/data3'];

function useThirdFileSize(size) {
	console.log('the third files size is ', size);
}

function useFileStats(stats) {
	console.log('stats for files');
	stats.forEach(function(stat, index) {
		console.log(index,':',JSON.stringify(stat));
	});
}

// third approach - manually control each section
// maximum efficiency, error handling
async.parallel([
	// this deals with the third file
	function(callback) {
		fs.stat(files[2], function(error, stat) {
			if (stat) {
				useThirdFileSize(stat.size);
			}
			callback(error, stat);
		});
	},
	// this deals with the rest
	function(callback) {
		var firstTwoFiles = [files[0],files[1]];
		async.map(firstTwoFiles, fs.stat, callback);
	}
], function(err, results) {
	// this joins the results together
	useFileStats([results[0]].concat(results[1]));
});
