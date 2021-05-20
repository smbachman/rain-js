import * as Rays from './rays.js';
import * as Spheres from './spheres.js';
import * as T from './tuples.js';

export function intersection(t, object) {
  return { t, object };
}

export function intersections(...args) {
  return args.sort((a, b) => a.t - b.t);
}

export function hit(xs) {
  return xs.find(i => i.t > 0);
}

export function prepareComputations(intersection, ray) {
  const point = Rays.position(ray, intersection.t);
  const comps = {
    t : intersection.t,
    object : intersection.object,
    point,
    eyev: T.negate(ray.direction),
    normalv: Spheres.normalAt(intersection.object, point),
    inside: false
  };
  
  if (T.dot(comps.normalv, comps.eyev) < 0) {
    comps.inside = true;
    comps.normalv = T.negate(comps.normalv);
  }
  
  return comps;
}
