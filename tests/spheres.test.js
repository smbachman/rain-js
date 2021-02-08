const {test} = require('zora');
const Tuples = require('../src/tuples.js');
const Matrices = require('../src/matrices.js');
const {translation, scaling} = require('../src/transformations.js');
const {ray} = require('../src/rays.js');
const {sphere, intersect, setTransform} = require('../src/spheres.js');

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
  
  /*
  t.test('The normal on a sphere at a point on the x axis', t => {
    const s = sphere();
    const n = normalAt(s, point(1, 0, 0));
    t.equal(n, vector(1, 0, 0));
  });

 
  Scenario: The normal on a sphere at a point on the x axis
  Given s ← sphere()
  When n ← normal_at(s, point(1, 0, 0))
  Then n = vector(1, 0, 0)

Scenario: The normal on a sphere at a point on the y axis
  Given s ← sphere()
  When n ← normal_at(s, point(0, 1, 0))
  Then n = vector(0, 1, 0)

Scenario: The normal on a sphere at a point on the z axis
  Given s ← sphere()
  When n ← normal_at(s, point(0, 0, 1))
  Then n = vector(0, 0, 1)

Scenario: The normal on a sphere at a nonaxial point
  Given s ← sphere()
  When n ← normal_at(s, point(√3/3, √3/3, √3/3))
  Then n = vector(√3/3, √3/3, √3/3)
  */

});