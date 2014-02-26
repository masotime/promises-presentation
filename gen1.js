// what generators really do
'use strict';

function* simpleGenerator() {
	console.log('simpleGenerator started');
	yield 1;
	yield 2;
	yield 3;
	return 'done';
}

// test is like an iterator
var test = simpleGenerator(), step;

/*
console.log('going to begin simpleGenerator().next()');
do {
	step = test.next();
	console.log('executed simpleGenerator().next()');
	console.log(step.value)
} while (!step.done);
/* */

//*
var test2 = sendGenerator(), initialValue, i=1;

function* sendGenerator() {
	console.log('sendGenerator started');
	var x,y,z;
	x = yield 'first yield';
	y = yield 'second yield';
	z = yield 'third yield';
	return [x,y,z];
}

console.log('going to begin sendGenerator().next()');
initialValue = test2.next();
console.log('initialValue =',initialValue.value);
do {
	step = test2.next(i);
	i+=1;
	console.log('executed sendGenerator().next(Math.random())');
	console.log(step.value);
} while (!step.done);
/* */