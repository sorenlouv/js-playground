const assert = require('assert');

const compose = (...funcs) => (...args) =>
  funcs.reduce((mem, func) => [func(...mem)], [...args]);

const sum = (x, y) => x + y;
const double = x => x * 2;
const addTwo = x => x + 2;

for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    console.log(`i = ${i}, j = ${j} res=${compose(sum, double, addTwo)(i, j)}`);
    assert.equal(addTwo(double(sum(i, j))), compose(sum, double, addTwo)(i, j));
  }
}

// Const greet = (x) => `Hello, ${ x }`;
// Const emote = (x) => `${x} :)`;
// Const happyGreeting = compose(emote, greet);
// Console.log(happyGreeting('Søren'));
