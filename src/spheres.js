const Tuples = require('./tuples.js');
const Matrices = require('./matrices.js');
const Rays = require('./rays.js');
const {intersection} = require('./intersections.js');

function sphere() {
  return { id: Date.now(), transform: Matrices.identity };
}

function intersect(sphere, r) {
  const ray = Rays.transform(r, Matrices.inverse(sphere.transform));
  const sphereToRay = Tuples.subtract(ray.origin, Tuples.point(0, 0, 0));
  
  const a = Tuples.dot(ray.direction, ray.direction);
  const b = 2 * Tuples.dot(ray.direction, sphereToRay);
  const c = Tuples.dot(sphereToRay, sphereToRay) - 1;
  
  const discriminant = (b * b) - 4 * a * c;
  
  if (discriminant < 0) return [];
  
  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
  
  return [intersection(t1, sphere), intersection(t2, sphere)];
}

function setTransform(s, t) {
  s.transform = t;
}

module.exports = { sphere, intersect, setTransform };