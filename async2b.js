// What if I want to re-use a result elsewhere?
var fs = require('fs'),
	async = require('async'),
	files = ['data/data1', 'data/datxxa2', 'data/data3'];
	//files = ['data/data1', 'data/data2', 'data/data3'];

 function useThirdFileSize(size) {
	console.log('the third files size is ', size);
}

 function useFileStats(stats) {
	console.log('stats for files');
	stats.forEach(function(stat, index) {
		console.log(index,':',JSON.stringify(stat));
	});
}

// second approach - use async only - problem if error on other files, have to wait for all files
async.map(files, fs.stat, function(err, stats) {
	if (err) {
		console.error(err);
	} else {
		useThirdFileSize(stats[2].size);
		useFileStats(stats);
	}
});