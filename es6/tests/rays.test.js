import {test} from './zora.js';
import * as Tuples from '../src/tuples.js';
import {translation, scaling} from '../src/transformations.js';
import {ray, position, transform} from '../src/rays.js';

const { point, vector } = Tuples;

test('rays', t => {
  
  t.test('Creating and querying a ray', t => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const r = ray(origin, direction);
    t.equal(r.origin, origin);
    t.equal(r.direction, direction);
  });
  
  t.test('Computing a point from a distance', t => {
    const r = ray(point(2, 3, 4), vector(1, 0, 0));
    t.equal(position(r, 0), point(2, 3, 4));
    t.equal(position(r, 1), point(3, 3, 4));
    t.equal(position(r, -1), point(1, 3, 4));
    t.equal(position(r, 2.5), point(4.5, 3, 4));
  });
  
  t.test('Translating a ray', t => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = translation(3, 4, 5);
    const r2 = transform(r, m);
    t.equal(r2.origin, point(4, 6, 8));
    t.equal(r2.direction, vector(0, 1, 0));
  });
  
  t.test('Scaling a ray', t => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = scaling(2, 3, 4);
    const r2 = transform(r, m);
    t.equal(r2.origin, point(2, 6, 12));
    t.equal(r2.direction, vector(0, 3, 0));
  });
  
});