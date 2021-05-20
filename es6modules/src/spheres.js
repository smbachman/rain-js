import * as T from './tuples.js';
import * as M from './matrices.js';
import * as Rays from './rays.js';
import * as I from './intersections.js';
import * as Ml from './materials.js';

export function sphere() {
  return { id: Date.now(), transform: M.identity, material: Ml.material() };
}

export function intersect(sphere, r) {
  const ray = Rays.transform(r, M.inverse(sphere.transform));
  const sphereToRay = T.subtract(ray.origin, T.point(0, 0, 0));
  
  const a = T.dot(ray.direction, ray.direction);
  const b = 2 * T.dot(ray.direction, sphereToRay);
  const c = T.dot(sphereToRay, sphereToRay) - 1;
  
  const discriminant = (b * b) - 4 * a * c;
  
  if (discriminant < 0) return [];
  
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
  
  return [I.intersection(t1, sphere), I.intersection(t2, sphere)];
}

export function setTransform(s, t) {
  s.transform = t;
}

export function normalAt(s, worldPoint) {
  const objectPoint = M.multiplyTuple(M.inverse(s.transform), worldPoint);
  const objectNormal = T.subtract(objectPoint, T.point(0, 0, 0));
  let worldNormal = M.multiplyTuple(M.transpose(M.inverse(s.transform)), objectNormal);
  worldNormal[3] = 0;
  return T.normalize(worldNormal);
}
