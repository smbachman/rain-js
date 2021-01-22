function tuple(x, y, z, w) {
	return { x, y, z, w };
}

function point(x, y, z) {
  return tuple(x, y, z, 1.0);
}

function vector(x, y, z) {
  return tuple(x, y, z, 0.0);
}

function isPoint(tuple) {
	return tuple.w === 1.0;
}

function isVector(tuple) {
	return tuple.w === 0.0;
}

function add(a, b) {
  return tuple(a.x + b.x, a.y + b.y, a.z + b.z, a.w + b.w);
}

function subtract(a, b) {
  return tuple(a.x - b.x, a.y - b.y, a.z - b.z, a.w - b.w);
}

function negate(t) {
  return tuple(-t.x, -t.y, -t.z, -t.w);
}

function multiply(t, s) {
  return tuple(t.x * s, t.y * s, t.z * s, t.w * s);
}

function divide(t, s) {
  return tuple(t.x / s, t.y / s, t.z / s, t.w / s);
}

function magnitude(t) {
  return Math.sqrt(t.x * t.x + t.y * t.y + t.z * t.z + t.w * t.w);
}

function normalize(v) {
  const m = magnitude(v);
  return tuple(v.x / m, v.y / m, v.z / m, v.w / m);
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w;
}

function cross(a, b) {
  return vector(a.y * b.z - a.z * b.y,
    a.z * b.x - a.x * b.z,
    a.x * b.y - a.y * b.x);
  }
  
module.exports = {tuple, isPoint, isVector, point, vector, 
  add, subtract, negate, multiply, divide,
  magnitude, normalize, dot, cross};