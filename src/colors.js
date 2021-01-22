const Tuples = require('./tuples.js');

function color(red, green, blue) {
  return { red, green, blue };
}

function toTuple(c) {
  return Tuples.tuple(c.red, c.green, c.blue, 0);
}

function toColor(t) {
  return color(t.x, t.y, t.z);
}

function add(a, b) {
  return toColor(Tuples.add(toTuple(a), toTuple(b)));
}

function subtract(a, b) {
  return toColor(Tuples.subtract(toTuple(a), toTuple(b)));
}

function multiply(c, s) {
  return toColor(Tuples.multiply(toTuple(c), s));
}

function hadamardProduct(a, b) {
  return color(a.red * b.red, a.green * b.green, a.blue * b.blue);
}

module.exports = {
  color, toTuple, toColor, add, subtract, multiply, hadamardProduct
};