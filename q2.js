// Emulating a real-life flow
'use strict';
var Q = require('q');

function callbackFunctionFactory(name, timeout, work, result, throwsError) {
	return function(data, callback) {
		setTimeout(function() {
			if (throwsError) {
				var err = {name: 'Worker Problem', message: name + " can't finish " + work + ' on '+data};
				callback(err, null);
			} else {
				console.log(name,'finishes work on',work,'using',JSON.stringify(data),'\n');
				callback(null, {work: work, data: data, result: result});
			}
		}, timeout * 1000);
	}
};

function promiseFunctionFactory(name, timeout, work, result, throwsError) {
	return function(data) {
		var deferred = Q.defer();
		setTimeout(function() {
			if (throwsError) {
				var err = {name: 'Worker Problem', message: name + " can't finish " + work + ' on ' +data };
				deferred.reject(err);
			} else {
				console.log(name,'finishes work on',work,'using',JSON.stringify(data),'\n');
				deferred.resolve({work: work, data:data, result: result});
			}
		}, timeout * 1000);

		return deferred.promise;
	}
}

// these are our functions
var LianyDoSWAG = callbackFunctionFactory('Liany', 4, 'UIE SWAG', '3 days');
var BenDoSWAG = promiseFunctionFactory('Ben', 3, 'UIE SWAG', '6 days', true);

// because this is in callback-style, we have to convert
var pLianyDoSWAG = Q.denodeify(LianyDoSWAG);

// now we have our promises (instead of values)
var AN1Swag = pLianyDoSWAG('AN 1');
var AN2Swag = BenDoSWAG('AN 2');

var swags = Q.all([AN1Swag, AN2Swag])
	.then(undefined /* all is good */, function(err) {
		console.error('ERROR: ', err);
		console.log('ERROR: Liany will do AN2 instead');
		return Q.all([AN1Swag, pLianyDoSWAG('AN 2')]);
	});

swags.then(function(swags) {
	swags.forEach(function(swag) {
		console.log(swag.work,'will take',swag.result);
	});
});

// now we look at coding
/*
var RajDoCODE = promiseFunctionFactory('Raj', 4, 'DEV WORK', 'stage2dev090');
var BenDoESTIMATE = promiseFunctionFactory('Ben', 2, 'CONTENT ESTIMATE', '1000 words');
var BenDoCODE = promiseFunctionFactory('Ben', 3, 'UIE WORK', '<Choose><Choice when="I am sick of XML"><Fragment......>');

var stage = swags.then(RajDoCODE);
var contentEstimate = swags.then(BenDoESTIMATE);
Q.all([stage, contentEstimate]).then(BenDoCODE).then(function(code) {
	console.log('The code is done:', code.result);
}, function(err) {
	console.error('Coding could not complete', err);
});
/* */
