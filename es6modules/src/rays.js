import * as T from './tuples.js';
import * as M from './matrices.js';

export function ray(origin, direction) {
  return { origin, direction };
}

export function position(ray, t) {
  return T.add(ray.origin, T.multiply(ray.direction, t));
}

export function transform(r, matrix) {
  return ray(M.multiplyTuple(matrix, r.origin), 
    M.multiplyTuple(matrix, r.direction));
}
