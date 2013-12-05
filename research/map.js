// ?
var Q = require('q');

var test = function(val) {
	console.log('test promise function invoked with '+val);
	var deferred = Q.defer();
	setTimeout(function() {
		deferred.resolve(val);
	}, 2000);
	return deferred.promise;
}

var test2 = function(val, callback) {
	console.log('node-like function invoked with arguments = ',arguments);
	setTimeout(function() {
		callback(null, val);
	}, 2000);
}

var values = [4,52,23];

var convertedTest = Q.denodeify(test2);
// the reason why I cannot map directly is because
// map wilL call "convertedTest" with multiple arguments
// for a given value, and the denodeified function is
// not expecting an invocation with more than 1 argument.
//
// var promises = values.map(convertedTest);

//var promises = [convertedTest(4), convertedTest(52), convertedTest(23)];
var promises = values.map(Q.nfbind(test2));

/*
var promises = values.map(test);
// var promises = [test(4), test(52), test(23)];
*/
Q.all(promises).then(function(results) {
	console.log(results);
});