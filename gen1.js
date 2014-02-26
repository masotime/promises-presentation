function* simpleGenerator() {
	console.log('simpleGenerator started');
	yield 1;
	yield 2;
	yield 3;
	return 'done';
}

function* sendGenerator() {
	console.log('sendGenerator started');
	var x,y,z;
	x = yield 'first yield';
	y = yield 'second yield';
	z = yield 'third yield';
	return [x,y,z];
}

// test is like an iterator
var test = simpleGenerator(), test2 = sendGenerator(), step;

console.log('going to begin simpleGenerator().next()');
do {
	step = test.next();
	console.log('executed simpleGenerator().next()');
	console.log(step.value)
} while (!step.done);

console.log('going to begin sendGenerator().next()');
do {
	step = test2.next(Math.random());
	console.log('executed sendGenerator().next(Math.random())');
	console.log(step.value);
} while (!step.done);