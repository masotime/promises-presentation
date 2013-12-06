# Promises in Javascript

To run this presentation, 

	npm install
	grunt serve

Presentation was done using [reveal.js](http://lab.hakim.se/reveal-js/) - a really easy to use HTML5 presentation framework.

## Examples

* fs1.js - Simple async - stat 3 files and echo their file sizes
* fs2.js - Series async - read contents of 3 files one by one and join the contents
* async1.js - join contents of 3 files, add sizes of 3 files using async flow control library
* async2a.js - multiple tasks for the same set of data: async + callback
* async2b.js - multiple tasks for the same set of data: pure async
* async2c.js - multiple tasks for the same set of data: async.parallel
* q1.js - rewrite of async2 examples using Q / Promises
* q2.js - UIE example flow