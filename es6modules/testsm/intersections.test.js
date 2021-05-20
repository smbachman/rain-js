import {test} from './zora.js';
import * as Tuples from '../src/tuples.js';
import * as Rays from '../src/rays.js';
import {sphere} from '../src/spheres.js';
import {intersection, intersections, hit, prepareComputations} from '../src/intersections.js';

const { point, vector } = Tuples;

test('intersections', t => {
  
  t.test('An intersection encapsulates t and object', t => {
    const s = sphere();
    const i = intersection(3.5, s);
    t.equal(i.t, 3.5);
    t.equal(i.object, s);
  });
  
  t.test('Aggregating intersections', t => {
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
  
  t.test('Precomputing the state of an intersection', t => {
    const r = Rays.ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(4, shape);
    const comps = prepareComputations(i, r);
    t.equal(comps.t, i.t);
    t.equal(comps.object, i.object);
    t.equal(comps.point, point(0, 0, -1));
    t.equal(comps.eyev, vector(0, 0, -1));
    t.equal(comps.normalv, vector(0, 0, -1));
  });
  
  t.test('The hit, when an intersection occurs on the outside', t => {
    const r = Rays.ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(4, shape);
    const comps = prepareComputations(i, r);
    t.notOk(comps.inside);
  });
  
  t.test('The hit, when an intersection occurs on the inside', t => {
    const r = Rays.ray(point(0, 0, 0), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(1, shape);
    const comps = prepareComputations(i, r);
    t.equal(comps.point, point(0, 0, 1));
    t.equal(comps.eyev, vector(0, 0, -1));
    t.equal(comps.normalv, vector(0, 0, -1));
    t.equal(comps.inside, true);
  });

// Scenario: The hit, when an intersection occurs on the inside
//   Given r ← ray(point(0, 0, 0), vector(0, 0, 1))
//     And shape ← sphere()
//     And i ← intersection(1, shape)
//   When comps ← prepare_computations(i, r)
//   Then comps.point = point(0, 0, 1)
//     And comps.eyev = vector(0, 0, -1)
//     And comps.inside = true
//       # normal would have been (0, 0, 1), but is inverted!
//       And comps.normalv = vector(0, 0, -1)
});