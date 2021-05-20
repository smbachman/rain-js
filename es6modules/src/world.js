import * as Spheres from './spheres.js';
import * as Lights from './lights.js';
import * as I from './intersections.js';
import * as T from './tuples.js';
import * as C from './colors.js';
import * as X from './transformations.js';
import * as Ml from './materials.js';

export function world(light, objects) {
  return { light, objects };
}

export function defaultWorld() {
  const light = Lights.pointLight(T.point(-10, 10, -10), C.color(1, 1, 1));
    
  const s1 = Spheres.sphere();
  s1.material.color = C.color(0.8, 1, 0.6);
  s1.material.diffuse = 0.7;
  s1.material.specular = 0.2;
  
  const s2 = Spheres.sphere();
  Spheres.setTransform(s2, X.scaling(0.5, 0.5, 0.5));
  
  return world(light, [s1, s2]);
}

export function intersectWorld(world, ray) {
  let xs = [];
  world.objects.forEach(o => {
    xs = [...xs, ...Spheres.intersect(o, ray)];
  });
  return I.intersections(...xs);
}

export function shadeHit(world, comps) {
  return Ml.lighting(comps.object.material, world.light, comps.point, comps.eyev, comps.normalv);
}

export function colorAt(world, ray) {
  const xs = intersectWorld(world, ray);
  const hit = I.hit(xs);
  
  if (!hit) {
    return C.color(0, 0, 0);
  }
  
  const comps = I.prepareComputations(hit, ray);
  return shadeHit(world, comps);
}