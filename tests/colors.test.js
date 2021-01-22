const {test} = require('zora');
const {color, add, subtract, multiply, hadamardProduct} = require("../src/colors.js");
const {floatEqual} = require("../src/comparison.js");

test('colors', function (t) {
  
  t.test('colors are (red, green, blue) tuples', function () {
    let c = color(-0.5, 0.4, 1.7);
    t.equal(c.red, -0.5);
    t.equal(c.green, 0.4);
    t.equal(c.blue, 1.7);
  });
  
  t.test('Adding colors', function () {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);    
    t.equal(add(a, b), color(1.6, 0.7, 1.0));    
  });
  
  t.test('Subtracting colors', function () {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);
    const r = subtract(a, b);
    t.ok(floatEqual(r.red, 0.2));
    t.equal(r.green, 0.5);
    t.equal(r.blue, 0.5);
  });
  
  t.test('Multiplying a color by a scalar', function () {
    const c = color(0.2, 0.3, 0.4);
    t.equal(multiply(c, 2), color(0.4, 0.6, 0.8));
  });
  
  t.test('Multiplying colors', function () {
    const a = color(1, 0.2, 0.4);
    const b = color(0.9, 1, 0.1);
    const r = hadamardProduct(a, b);
    t.equal(r.red, 0.9);
    t.equal(r.green, 0.2);
    t.ok(floatEqual(r.blue, 0.04));
  });
  
});