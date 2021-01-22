function defineTupleProperties(t) {
  Object.defineProperties(t, {
    x: { get: function() { return this[0]; } },
    y: { get: function() { return this[1]; } },
    z: { get: function() { return this[2]; } },
    w: { get: function() { return this[3]; } }
  });
}

function tuple(x, y, z, w) {
  let t = [ x, y, z, w ];
  defineTupleProperties(t);
  return t;
}

function point(x, y, z) {
  return tuple(x, y, z, 1.0);
}

function vector(x, y, z) {
  return tuple(x, y, z, 0.0);
}

function isPoint(tuple) {
	return tuple[3] === 1.0;
}

function isVector(tuple) {
	return tuple[3] === 0.0;
}

function add(a, b) {
  return tuple(a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]);
}

function subtract(a, b) {
  return tuple(a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]);
}

function negate(t) {
  return tuple(-t[0], -t[1], -t[2], -t[3]);
}

function multiply(t, s) {
  return tuple(t[0] * s, t[1] * s, t[2] * s, t[3] * s);
}

function divide(t, s) {
  return tuple(t[0] / s, t[1] / s, t[2] / s, t[3] / s);
}

function magnitude(t) {
  return Math.sqrt(t[0] * t[0] + t[1] * t[1] + t[2] * t[2] + t[3] * t[3]);
}

function normalize(v) {
  const m = magnitude(v);
  return tuple(v[0] / m, v[1] / m, v[2] / m, v[3] / m);
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
}

function cross(a, b) {
  return vector(a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]);
  }
  
module.exports = {tuple, isPoint, isVector, point, vector, 
  add, subtract, negate, multiply, divide,
  magnitude, normalize, dot, cross};