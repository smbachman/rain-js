import {test} from './zora.js';
import * as Tuples from '../src/tuples.js';
import * as Matrices from '../src/matrices.js';
import {translation, scaling, rotationZ} from '../src/transformations.js';
import {ray} from '../src/rays.js';
import {material} from '../src/materials.js';
import {sphere, intersect, setTransform, normalAt} from '../src/spheres.js';

const { point, vector } = Tuples;

test('spheres', t => {
  
  t.test('A ray intersects a sphere at two points', t => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, 4);
    t.equal(xs[1].t, 6);
  });
  
  t.test('A ray intersects a sphere at a tangent', t => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, 5);
    t.equal(xs[1].t, 5);
  });
  
  t.test('A ray misses a sphere', t => {
    const r = ray(point(0, 2, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 0);
  });
  
  t.test('A ray originates inside a sphere', t => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, -1);
    t.equal(xs[1].t, 1);
  });
  
  t.test('A sphere is behind a ray', t => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, -6);
    t.equal(xs[1].t, -4);
  });
  
  t.test('Intersect sets the object on the intersection', t => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].object, s);
    t.equal(xs[1].object, s);
  });
  
  t.test("A sphere's default transformation", t => {
    const s = sphere();
    t.equal(s.transform, Matrices.identity);
  });
 
  t.test("Changing a sphere's transformation", t => {
    const s = sphere();
    const tr = translation(2, 3, 4);
    setTransform(s, tr);
    t.equal(s.transform, tr);
  });
  
  t.test('Intersecting a scaled sphere with a ray', t => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    setTransform(s, scaling(2, 2, 2));
    const xs = intersect(s, r);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, 3);
    t.equal(xs[1].t, 7);
  });

  t.test('Intersecting a translated sphere with a ray', t => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    setTransform(s, translation(5, 0, 0));
    const xs = intersect(s, r);
    t.equal(xs.length, 0);
  });
  
  t.test('The normal on a sphere at a point on the x axis', t => {
    const s = sphere();
    const n = normalAt(s, point(1, 0, 0));
    t.equal(n, vector(1, 0, 0));
  });

  t.test('The normal on a sphere at a point on the y axis', t => {
    const s = sphere();
    const n = normalAt(s, point(0, 1, 0));
    t.equal(n, vector(0, 1, 0));
  });
  
  t.test('The normal on a sphere at a point on the z axis', t => {
    const s = sphere();
    const n = normalAt(s, point(0, 0, 1));
    t.equal(n, vector(0, 0, 1));
  });
  
  t.test('The normal on a sphere at a nonaxial point', t => {
    const s = sphere();
    const n = normalAt(s, point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    t.equal(n, vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
  });

  t.test('The normal is a normalized vector', t => {
    const s = sphere();
    const n = normalAt(s, point(3 * Math.sqrt(3), 3 * Math.sqrt(3), 3 * Math.sqrt(3)));
    t.equal(n, Tuples.normalize(n));
  });

  t.test('Computing the normal on a translated sphere', t => {
    const s = sphere();
    setTransform(s, translation(0, 1, 0));
    const n = normalAt(s, point(0, 1.70711, -0.70711));
    t.ok(Matrices.equal([n], [vector(0, 0.70711, -0.70711)]));
  });
  
  t.test('Computing the normal on a translated sphere', t => {
    const s = sphere();
    const m = Matrices.multiply(scaling(1, 0.5, 1), rotationZ(Math.PI / 5));
    setTransform(s, m);
    const n = normalAt(s, point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2));
    t.ok(Matrices.equal([n], [vector(0, 0.97014, -0.24254)]));
  });

  t.test('A sphere has a default material', t => {
    const s = sphere();
    const m = s.material;
    t.equal(m, material());
  });
  
  t.test('A sphere may be assigned a material', t => {
    const s = sphere();
    const m = material();
    m.ambient = 1;
    s.material = m;
    t.equal(s.material, m);
  });
  
});