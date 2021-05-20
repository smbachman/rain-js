import {test} from './zora.js';
import * as M from '../src/matrices.js';
import * as T from '../src/tuples.js';
import {translation, scaling, shearing,
  rotationX, rotationY, rotationZ, viewTransform} from '../src/transformations.js';

test('transformations', t => {
  
  t.test('multiplying by a translation matrix', t => {
    let transform = translation(5, -3, 2);
    let p = T.point(-3, 4, 5);
    t.equal(M.multiplyTuple(transform, p), T.point(2, 1, 7));
  });
  
  t.test('Multiplying by the inverse of a translattea matrix', t => {
    let transform = translation(5, -3, 2);
    let inv = M.inverse(transform);
    let p = T.point(-3, 4, 5);
    t.equal(M.multiplyTuple(inv, p), T.point(-8, 7, 3));
  });

  t.test('Translation does not affect vectors', t => {
    let transform = translation (5, -3, 2);
    let v = T.vector(-3, 4, 5);
    t.equal(M.multiplyTuple(transform, v), v);
  });
  
  t.test('a scaling matrix applied to a point', t => {
    let transform = scaling(2, 3, 4);
    let p = T.point(-4, 6, 8);
    t.equal(M.multiplyTuple(transform, p), T.point(-8, 18, 32));
  });
  
  t.test('a scaling matrix applied to a vector', t => {
    let transform = scaling(2, 3, 4);
    let p = T.vector(-4, 6, 8);
    t.equal(M.multiplyTuple(transform, p), T.vector(-8, 18, 32));
  });
  
  t.test('multiplying by the inverse of a scaling matrix', t => {
    let transform = scaling(2, 3, 4);
    let inv = M.inverse(transform);
    let v = T.vector(-4, 6, 8);
    t.equal(M.multiplyTuple(inv, v), T.vector(-2, 2, 2));
  });
  
  t.test('reflection is scaling by a negative value', t => {
    let transform = scaling(-1, 1, 1);
    let p = T.point(2, 3, 4);
    t.equal(M.multiplyTuple(transform, p), T.point(-2, 3, 4));
  });
  
  t.test('rotating a point around the x axis', t => {
    let p = T.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let fullQuarter = rotationX(Math.PI / 2);
    
    t.ok(M.equal([M.multiplyTuple(halfQuarter, p)], 
      [T.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)]));
    t.ok(M.equal([M.multiplyTuple(fullQuarter, p)], [T.point(0, 0, 1)]));
  });
  
  t.test('The inverse of an x-rotation rotates in the opposite direction', t => {
    let p = T.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let inv = M.inverse(halfQuarter);
    
    t.ok(M.equal([M.multiplyTuple(inv, p)], 
      [T.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2)]));
  });
  
  t.test('rotating a point around the y axis', t => {
    let p = T.point(0, 0, 1);
    let halfQuarter = rotationY(Math.PI / 4);
    let fullQuarter = rotationY(Math.PI / 2);
    
    t.ok(M.equal([M.multiplyTuple(halfQuarter, p)], 
      [T.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2)]));
    t.ok(M.equal([M.multiplyTuple(fullQuarter, p)], [T.point(1, 0, 0)]));
  });
  
  t.test('rotating a point around the z axis', t => {
    let p = T.point(0, 1, 0);
    let halfQuarter = rotationZ(Math.PI / 4);
    let fullQuarter = rotationZ(Math.PI / 2);
    
    t.ok(M.equal([M.multiplyTuple(halfQuarter, p)], 
      [T.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0)]));
    t.ok(M.equal([M.multiplyTuple(fullQuarter, p)], [T.point(-1, 0, 0)]));
  });
  
  t.test('A shearing transformation moves x in proportion to y', t => {
    let transform = shearing(1, 0, 0, 0, 0, 0);
    let p = T.point(2, 3, 4);
    t.equal(M.multiplyTuple(transform, p), T.point(5, 3, 4));
  });
  
  t.test('A shearing transformation moves x in proportion to z', t => {
    let transform = shearing(0, 1, 0, 0, 0, 0);
    let p = T.point(2, 3, 4);
    t.equal(M.multiplyTuple(transform, p), T.point(6, 3, 4));
  });
  
  t.test('A shearing transformation moves y in proportion to x', t => {
    let transform = shearing(0, 0, 1, 0, 0, 0);
    let p = T.point(2, 3, 4);
    t.equal(M.multiplyTuple(transform, p), T.point(2, 5, 4));
  });
  
  t.test('A shearing transformation moves y in proportion to z', t => {
    let transform = shearing(0, 0, 0, 1, 0, 0);
    let p = T.point(2, 3, 4); 
    t.equal(M.multiplyTuple(transform, p), T.point(2, 7, 4));
  });
  
  t.test('A shearing transformation moves z in proportion to x', t => {
    let transform = shearing(0, 0, 0, 0, 1, 0);
    let p = T.point(2, 3, 4);
    t.equal(M.multiplyTuple(transform, p), T.point(2, 3, 6));
  });
  
  t.test('A shearing transformation moves z in proportion to y', t => {
    let transform = shearing(0, 0, 0, 0, 0, 1);
    let p = T.point(2, 3, 4); 
    t.equal(M.multiplyTuple(transform, p), T.point(2, 3, 7));
  });
  
  t.test('individual transformations are applied in sequence', t => {
    let p = T.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let p2 = M.multiplyTuple(a, p);
    t.ok(M.equal([p2], [T.point(1, -1, 0)]));
    
    let p3 = M.multiplyTuple(b, p2);
    t.ok(M.equal([p3], [T.point(5, -5, 0)]));
    
    let p4 = M.multiplyTuple(c, p3);
    t.ok(M.equal([p4], [T.point(15, 0, 7)]));
  });
  
  t.test('Chained transformations must be applied in reverse order', t =>{
    let p = T.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let transform = M.multiply(c, M.multiply(b, a));
    t.ok(M.equal([M.multiplyTuple(transform, p)], [T.point(15, 0, 7)]));
  });
  
  t.test('The transformation matrix', t => {
    const from = T.point(0, 0, 0);
    const to = T.point(0, 0, -1);
    const up = T.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    t.equal(vt, M.identity);
  });
  
  t.test('A view transformation matrix looking in positive z direction', t => {
    const from = T.point(0, 0, 0);
    const to = T.point(0, 0, 1);
    const up = T.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    t.equal(vt, scaling(-1, 1, -1));
  });

  t.test('The view transformation moves the world', t => {
    const from = T.point(0, 0, 8);
    const to = T.point(0, 0, 0);
    const up = T.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    t.equal(vt, translation(0, 0, -8));
  });
  
  t.test('An arbitrary view transformation', t => {
    const from = T.point(1, 3, 2);
    const to = T.point(4, -2, 8);
    const up = T.vector(1, 1, 0);
    const vt = viewTransform(from, to, up);
    t.ok(M.equal(vt, M.matrix(4, 
      -0.50709, 0.50709, 0.67612, -2.36643,
      0.76772, 0.60609, 0.12122, -2.82843,
      -0.35857, 0.59761, -0.71714, 0.00000,
      0.00000, 0.00000, 0.00000, 1.00000)));
  });
  
});
