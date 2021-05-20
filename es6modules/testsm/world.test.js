import {test} from './zora.js';
import {world, defaultWorld, intersectWorld, shadeHit, colorAt} from '../src/world.js';
import * as Spheres from '../src/spheres.js';
import * as Lights from '../src/lights.js';
import * as Rays from '../src/rays.js';
import * as T from '../src/tuples.js';
import * as C from '../src/colors.js';
import * as X from '../src/transformations.js';
import * as I from '../src/intersections.js';

test('world', t => {
  
  t.test('Creating a world', t => {
    const w = world();
    t.notOk(w.light);
    t.notOk(w.objects);
  });
  
  t.test('The default world', t => {
    const light = Lights.pointLight(T.point(-10, 10, -10), C.color(1, 1, 1));
    
    const s1 = Spheres.sphere();
    s1.material.color = C.color(0.8, 1, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
    
    const s2 = Spheres.sphere();
    Spheres.setTransform(s2, X.scaling(0.5, 0.5, 0.5));
    
    const w = defaultWorld();
    
    t.equal(w.light, light);
    //t.equal(w.objects[0], s1);
    //t.equal(w.objects[1], s2);
  });
  
  t.test('Intersect a world with a ray', t => {
    const w = defaultWorld();
    const r = Rays.ray(T.point(0, 0, -5), T.vector(0, 0, 1));
    const xs = intersectWorld(w, r);
    t.equal(xs.length, 4);
    t.equal(xs[0].t, 4);
    t.equal(xs[1].t, 4.5);
    t.equal(xs[2].t, 5.5);
    t.equal(xs[3].t, 6);
  });
  
  t.test('Shading an intersection', t => {
    const w = defaultWorld();
    const r = Rays.ray(T.point(0, 0, -5), T.vector(0, 0, 1));
    const shape = w.objects[0];
    const i = I.intersection(4, shape);
    const comps = I.prepareComputations(i, r);
    const c = shadeHit(w, comps);
    t.ok(T.equal(c, C.color(0.38066, 0.47583, 0.2855)));
  });

  t.test('Shading an intersection from the inside', t => {
    const w = defaultWorld();
    w.light = Lights.pointLight(T.point(0, 0.25, 0), C.color(1, 1, 1));
    const r = Rays.ray(T.point(0, 0, 0), T.vector(0, 0, 1));
    const shape = w.objects[1];
    const i = I.intersection(0.5, shape);
    const comps = I.prepareComputations(i, r);
    const c = shadeHit(w, comps);
    t.ok(T.equal(c, C.color(0.90498, 0.90498, 0.90498)));
  });
  
  t.test('The color when a ray misses', t => {
    const w = defaultWorld();
    const r = Rays.ray(T.point(0, 0, -5), T.vector(0, 1, 0));
    const c = colorAt(w, r);
    t.equal(c, C.color(0, 0, 0));
  });

  t.test('The color when a ray hits', t => {
    const w = defaultWorld();
    const r = Rays.ray(T.point(0, 0, -5), T.vector(0, 0, 1));
    const c = colorAt(w, r);
    t.ok(T.equal(c, C.color(0.38066, 0.47583, 0.2855)));
  });

  t.test('The color with an intersection behind the ray', t => {
    const w = defaultWorld();
    const outer = w.objects[0];
    outer.material.ambient = 1;
    const inner = w.objects[1];
    inner.material.ambient = 1;
    const r = Rays.ray(T.point(0, 0, 0.75), T.vector(0, 0, -1));
    const c = colorAt(w, r);
    t.ok(T.equal(c, inner.material.color)); 
  });

});