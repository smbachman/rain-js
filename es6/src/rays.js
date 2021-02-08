import * as Tuples from './tuples.js';
import * as Matrices from './matrices.js';

export function ray(origin, direction) {
  return { origin, direction };
}

export function position(ray, t) {
  return Tuples.add(ray.origin, Tuples.multiply(ray.direction, t));
}

export function transform(r, matrix) {
  return ray(Matrices.multiplyTuple(matrix, r.origin), 
    Matrices.multiplyTuple(matrix, r.direction));
}
