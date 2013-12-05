var Q = require('q');
var fs = require('fs');

// make the promise functions
var readFilePromise = Q.denodeify(fs.readFile);
var joinFiles = function() {
	console.log(arguments);
};

var logArray = function(arr) {
	console.log(arr);
}

var sleep = function(ms) {
	setTimeout()
}

var saySomething = function(msg) {
	console.log(msg);
	return Q(msg);
};

var loop = function(promiseFn, arg) {
	return function(arg) {
		promiseFn(arg).then(function() {
			console.log('looping again');
			setTimeout(function() {
				loop(promiseFn)(arg);
			}, 1000);
		});
	};
};

// write the synchronous-like code
var firstdata = readFilePromise('data/data1', 'utf-8');
var seconddata = readFilePromise('data/data2', 'utf-8');
var thirddata = Q.nfcall(function(callback) {
	setTimeout(function() { callback(null, 'This will take some time.'); }, 1000);
});
var fourthdata = function() {
	var deferred = Q.defer();
	setTimeout(function() {
		deferred.resolve('this is the result');
	}, 2000);
	return deferred.promise;
};

// var step1 = Q.all([firstdata, seconddata, thirddata]).spread(joinFiles);
// step1.then(function() { return Q.all([firstdata, seconddata, thirddata]) }).then(logArray);

var allTheData = Q.all([firstdata, seconddata,thirddata, fourthdata()]);

allTheData.spread(joinFiles).done();
allTheData.then(loop(saySomething)).done();

console.log('synchronous-like code is done');
