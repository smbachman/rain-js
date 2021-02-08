const Tuples = require('./tuples.js');
const Matrices = require('./matrices.js');

function ray(origin, direction) {
  return { origin, direction };
}

function position(ray, t) {
  return Tuples.add(ray.origin, Tuples.multiply(ray.direction, t));
}

function transform(r, matrix) {
  return ray(Matrices.multiplyTuple(matrix, r.origin), 
    Matrices.multiplyTuple(matrix, r.direction));
}

module.exports = { ray, position, transform };