import {test} from './zora.js';
import {tuple, isPoint, isVector, point, vector, 
  add, subtract, negate, multiply, divide,
  magnitude, normalize, dot, cross} from '../src/tuples.js';

test('tuples', function (t) {
  
  t.test('A tuple with w=1.0 is a point', function (t) {
    const p = tuple(1,2,3,1);
    t.ok(isPoint(p));
    t.notOk(isVector(p));
  });
  
  t.test('A tuple with w=0 is a vector', function (t) {
    const v = tuple(1,2,3,0);
    t.notOk(isPoint(v));
    t.ok(isVector(v));
  });
  
  t.test('point() creates tuples with w=1', function (t) {
    t.equal(point(4, -4, 3), tuple(4, -4, 3, 1));
  });
  
  t.test('vector() creates tuples with w=0', function () {
    t.equal(vector(4, -4, 3), tuple(4, -4, 3, 0));
  });
  
  t.test('Adding two tuples', function () {
    const a = tuple(3, -2, 5, 1);
    const b = tuple(-2, 3, 1, 0);
    t.equal(add(a, b), tuple(1, 1, 6, 1));
  });
  
  t.test('Subtracting two points', function () {
    const a = point(3, 2, 1);
    const b = point(5, 6, 7);
    t.equal(subtract(a, b), vector(-2, -4, -6));
  });
  
  t.test('Subtracting a point from a vector', function () {
    const p = point(3, 2, 1);
    const v = vector(5, 6, 7);
    t.equal(subtract(p, v), point(-2, -4, -6));
  });
  
  t.test('Subtracting a vector from a vector', function () {
    const p = vector(3, 2, 1);
    const v = vector(5, 6, 7);
    t.equal(subtract(p, v), vector(-2, -4, -6));
  });
  
  t.test('Subtracting a vector from the zero vector', function () {
    const zero = vector(0, 0, 0);
    const v = vector(1, -2, 3);
    t.equal(subtract(zero, v), vector(-1, 2, -3));
  });
  
  t.test('Negating a tuple', function () {
    const p = tuple(1, -2, 3, -4);
    t.equal(negate(p), tuple(-1, 2, -3, 4));
  });
  
  t.test('Multiplying a tuple by a scalar', function () {
    const p = tuple(1, -2, 3, -4);
    t.equal(multiply(p, 3.5), tuple(3.5, -7, 10.5, -14));
  });
  
  t.test('Multiplying a tuple by a fraction', function () {
    const p = tuple(1, -2, 3, -4);
    t.equal(multiply(p, 0.5), tuple(0.5, -1, 1.5, -2));
  });
  
  t.test('Dividing a tuple by a scalar', function () {
    const p = tuple(1, -2, 3, -4);
    t.equal(divide(p, 2), tuple(0.5, -1, 1.5, -2));
  });
  
  t.test('Computing the magnitude of vector(1, 0, 0)', function () {
    const v = vector(1, 0, 0);
    t.equal(magnitude(v), 1);
  });
  
  t.test('Computing the magnitude of vector(0, 1, 0)', function () {
    const v = vector(0, 1, 0);
    t.equal(magnitude(v), 1);
  });
  
  t.test('Computing the magnitude of vector(0, 0, 1)', function () {
    const v = vector(0, 0, 1);
    t.equal(magnitude(v), 1);
  });
  
  t.test('Computing the magnitude of vector(1, 2, 3)', function () {
    const v = vector(1, 2, 3);
    t.equal(magnitude(v), Math.sqrt(14));
  });
  
  t.test('Computing the magnitude of vector(-1, -2, -3)', function () {
    const v = vector(-1, -2, -3);
    t.equal(magnitude(v), Math.sqrt(14));
  });
  
  t.test('Normalizing vector(4,0,0) givea vector(1,0,0)', function () {
    const v = vector(4, 0, 0);
    t.equal(normalize(v), vector(1, 0, 0));
  });
  
  t.test('Normalizing vector(1, 2, 3)', function () {
    const v = vector(1, 2, 3);
    const r = Math.sqrt(14);
    t.equal(normalize(v), vector(1/r, 2/r, 3/r));
  });
  
  t.test('The magnitude of a normalized vector', function () {
    const v = vector(1, 2, 3);
    t.equal(magnitude(normalize(v)), 1);
  });
  
  t.test('The dot product of two tuples', function () {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    t.equal(dot(a, b), 20);
  });
  
  t.test('The cross product of two vectors', function () {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    t.equal(cross(a, b), vector(-1, 2, -1));
    t.equal(cross(b, a), vector(1, -2, 1));
  });

});