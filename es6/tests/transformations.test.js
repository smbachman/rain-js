import {test} from './zora.js';
import * as Matrices from '../src/matrices.js';
import * as Tuples from '../src/tuples.js';
import {translation, scaling, shearing,
  rotationX, rotationY, rotationZ} from '../src/transformations.js';

test('transformations', t => {
  
  t.test('multiplying by a translation matrix', t => {
    let transform = translation(5, -3, 2);
    let p = Tuples.point(-3, 4, 5);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(2, 1, 7));
  });
  
  t.test('Multiplying by the inverse of a translattea matrix', t => {
    let transform = translation(5, -3, 2);
    let inv = Matrices.inverse(transform);
    let p = Tuples.point(-3, 4, 5);
    t.equal(Matrices.multiplyTuple(inv, p), Tuples.point(-8, 7, 3));
  });

  t.test('Translation does not affect vectors', t => {
    let transform = translation (5, -3, 2);
    let v = Tuples.vector(-3, 4, 5);
    t.equal(Matrices.multiplyTuple(transform, v), v);
  });
  
  t.test('a scaling matrix applied to a point', t => {
    let transform = scaling(2, 3, 4);
    let p = Tuples.point(-4, 6, 8);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(-8, 18, 32));
  });
  
  t.test('a scaling matrix applied to a vector', t => {
    let transform = scaling(2, 3, 4);
    let p = Tuples.vector(-4, 6, 8);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.vector(-8, 18, 32));
  });
  
  t.test('multiplying by the inverse of a scaling matrix', t => {
    let transform = scaling(2, 3, 4);
    let inv = Matrices.inverse(transform);
    let v = Tuples.vector(-4, 6, 8);
    t.equal(Matrices.multiplyTuple(inv, v), Tuples.vector(-2, 2, 2));
  });
  
  t.test('reflection is scaling by a negative value', t => {
    let transform = scaling(-1, 1, 1);
    let p = Tuples.point(2, 3, 4);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(-2, 3, 4));
  });
  
  t.test('rotating a point around the x axis', t => {
    let p = Tuples.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let fullQuarter = rotationX(Math.PI / 2);
    
    t.ok(Matrices.equal([Matrices.multiplyTuple(halfQuarter, p)], 
      [Tuples.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)]));
    t.ok(Matrices.equal([Matrices.multiplyTuple(fullQuarter, p)], [Tuples.point(0, 0, 1)]));
  });
  
  t.test('The inverse of an x-rotation rotates in the opposite direction', t => {
    let p = Tuples.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let inv = Matrices.inverse(halfQuarter);
    
    t.ok(Matrices.equal([Matrices.multiplyTuple(inv, p)], 
      [Tuples.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)]));
  });
  
  t.test('rotating a point around the y axis', t => {
    let p = Tuples.point(0, 0, 1);
    let halfQuarter = rotationY(Math.PI / 4);
    let fullQuarter = rotationY(Math.PI / 2);
    
    t.ok(Matrices.equal([Matrices.multiplyTuple(halfQuarter, p)], 
      [Tuples.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)]));
    t.ok(Matrices.equal([Matrices.multiplyTuple(fullQuarter, p)], [Tuples.point(1, 0, 0)]));
  });
  
  t.test('rotating a point around the z axis', t => {
    let p = Tuples.point(0, 1, 0);
    let halfQuarter = rotationZ(Math.PI / 4);
    let fullQuarter = rotationZ(Math.PI / 2);
    
    t.ok(Matrices.equal([Matrices.multiplyTuple(halfQuarter, p)], 
      [Tuples.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)]));
    t.ok(Matrices.equal([Matrices.multiplyTuple(fullQuarter, p)], [Tuples.point(-1, 0, 0)]));
  });
  
  t.test('A shearing transformation moves x in proportion to y', t => {
    let transform = shearing(1, 0, 0, 0, 0, 0);
    let p = Tuples.point(2, 3, 4);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(5, 3, 4));
  });
  
  t.test('A shearing transformation moves x in proportion to z', t => {
    let transform = shearing(0, 1, 0, 0, 0, 0);
    let p = Tuples.point(2, 3, 4);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(6, 3, 4));
  });
  
  t.test('A shearing transformation moves y in proportion to x', t => {
    let transform = shearing(0, 0, 1, 0, 0, 0);
    let p = Tuples.point(2, 3, 4);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(2, 5, 4));
  });
  
  t.test('A shearing transformation moves y in proportion to z', t => {
    let transform = shearing(0, 0, 0, 1, 0, 0);
    let p = Tuples.point(2, 3, 4); 
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(2, 7, 4));
  });
  
  t.test('A shearing transformation moves z in proportion to x', t => {
    let transform = shearing(0, 0, 0, 0, 1, 0);
    let p = Tuples.point(2, 3, 4);
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(2, 3, 6));
  });
  
  t.test('A shearing transformation moves z in proportion to y', t => {
    let transform = shearing(0, 0, 0, 0, 0, 1);
    let p = Tuples.point(2, 3, 4); 
    t.equal(Matrices.multiplyTuple(transform, p), Tuples.point(2, 3, 7));
  });
  
  t.test('individual transformations are applied in sequence', t => {
    let p = Tuples.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let p2 = Matrices.multiplyTuple(a, p);
    t.ok(Matrices.equal([p2], [Tuples.point(1, -1, 0)]));
    
    let p3 = Matrices.multiplyTuple(b, p2);
    t.ok(Matrices.equal([p3], [Tuples.point(5, -5, 0)]));
    
    let p4 = Matrices.multiplyTuple(c, p3);
    t.ok(Matrices.equal([p4], [Tuples.point(15, 0, 7)]));
  });
  
  t.test('Chained transformations must be applied in reverse order', t =>{
    let p = Tuples.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let transform = Matrices.multiply(c, Matrices.multiply(b, a));
    t.ok(Matrices.equal([Matrices.multiplyTuple(transform, p)], [Tuples.point(15, 0, 7)]));
  });
  
});
