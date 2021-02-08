const {test} = require('zora');
const Tuples = require('../src/tuples.js');
const {sphere} = require('../src/spheres.js');
const {intersection, intersections, hit} = require('../src/intersections.js');

const { point, vector } = Tuples;

test('intersections', t => {
  
  t.test('An intersection encapsulates t and object', t => {
    const s = sphere();
    const i = intersection(3.5, s);
    t.equal(i.t, 3.5);
    t.equal(i.object, s);
  });
  
  t.test('Aggregating intersectiosn', t => {
    const s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);
    const xs = intersections(i1, i2);
    t.equal(xs.length, 2);
    t.equal(xs[0].t, 1);
    t.equal(xs[1].t, 2);
  });
  
  t.test('The hit, when all intersections have positive t', t => {
    let s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    t.equal(i, i1);
  });

  t.test('The hit, when some intersections have negative t', t => {
    let s = sphere();
    const i1 = intersection(-1, s);
    const i2 = intersection(1, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    t.equal(i, i2);
  });
  
  t.test('The hit, when all intersections have negative t', t => {
    let s = sphere();
    const i1 = intersection(-2, s);
    const i2 = intersection(-1, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    t.notOk(i);
  });
  
  t.test('The hit is always the lowest nonnegative intersection', t => {
    let s = sphere();
    const i1 = intersection(5, s);
    const i2 = intersection(7, s);
    const i3 = intersection(-3, s);
    const i4 = intersection(2, s);
    const xs = intersections(i1, i2, i3, i4);
    const i = hit(xs);
    t.equal(i, i4);
  });
  
  /*

Scenario: The hit is always the lowest nonnegative intersection
  Given s ← sphere()
  And i1 ← intersection(5, s)
  And i2 ← intersection(7, s)
  And i3 ← intersection(-3, s)
  And i4 ← intersection(2, s)
  And xs ← intersections(i1, i2, i3, i4)
When i ← hit(xs)
Then i = i4
  */

});