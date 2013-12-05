var arr = [1,2,3,4,5];

var newarr = arr.map(function(val) { return val+1 });
console.log(newarr);

var inc = function(val) { return val+1 };

var twod = [[1,2,3], [3], [5,6,7]];

var result = twod.map(function(arr) { return arr.map(inc) });
console.log(result);

console.log(arr.reduce(function(acc, now) {
	return acc+now;
}));