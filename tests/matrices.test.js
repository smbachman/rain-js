const {test} = require('zora');
const {matrix, equal, multiply, multiplyTuple, identity, transpose, 
  determinant, submatrix, minor, cofactor, isInvertible, inverse} = require('../src/matrices.js');
const {tuple} = require('../src/tuples.js');

test('matrices', function (t) {
  
  t.test('Constructing and inspecting a 4x4 matrix', function() {
    let m = matrix(4,
      1, 2, 3, 4,
      5.5, 6.5, 7.5, 8.5,
      9, 10, 11, 12,
      13.5, 14.5, 15.5, 16.5
    );
    t.equal(m[0][0], 1);
    t.equal(m[0][3], 4);
    t.equal(m[1][0], 5.5);
    t.equal(m[1][2], 7.5);
    t.equal(m[2][2], 11);
    t.equal(m[3][0], 13.5);
    t.equal(m[3][2], 15.5);
  });
  
  t.test('A 2x2 matrix ought to be representable', function() {
    let m = matrix(2,
      -3, 5,
      1, -2
    );
    
    t.equal(m[0][0], -3);
    t.equal(m[0][1], 5);
    t.equal(m[1][0], 1);
    t.equal(m[1][1], -2);
  });
  
  t.test('A 3x3 matrix ought to be representable', function() {
    let m = matrix(3,
      -3, 5, 0,
      1, -2, -7,
      0, 1, 1
    );
    
    t.equal(m[0][0], -3);
    t.equal(m[1][1], -2);
    t.equal(m[2][2], 1);
  });
  
  t.test('matrix equality with identical matrices', function() {
    let a = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    t.ok(equal(a,b));
  });
  
  t.test('matrix equality with different matrices', function() {
    let a = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4,
      0,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    t.notOk(equal(a,b));
  });
  
  t.test('Multiplying two matrices', function(t) {
    let a = matrix(4,
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2);
      
    let b = matrix(4,
      -2, 1, 2, 3,
      3, 2, 1, -1,
      4, 3, 6, 5,
      1, 2, 7, 8);
      
    let result = matrix(4,
      20, 22, 50, 48,
      44, 54, 114, 108,
      40, 58, 110, 102,
      16, 26, 46, 42
    );
      
    t.ok(equal(multiply(a, b), result));
  });
  
  t.test('a matrix multiplied by a tuple', t => {
    let a = matrix(4,
      1, 2, 3, 4,
      2, 4, 4, 2,
      8, 6, 4, 1,
      0, 0, 0, 1);
      
    let b = tuple(1, 2, 3, 1);
    
    let result = multiplyTuple(a, b);
    
    t.equal(result, tuple(18, 24, 33, 1));
  });
  
  t.test('multiplying a matrix by the identity matrix', t => {
    let m = matrix(4,
      0, 1, 2, 4,
      1, 2, 4, 8,
      2, 4, 8, 16,
      4, 8, 16, 32);
      
    t.equal(multiply(m, identity), m);
  });
  
  
  t.test('multiplying a tuple by the identity matrix', t => {
    let p = tuple(1, 2, 3, 4);
      
    t.equal(multiplyTuple(identity, p), p);
  });
  
  t.test('transposing a matrix', t => {
    let m = matrix(4,
      0, 9, 3, 0,
      9, 8, 0, 8,
      1, 8, 5, 3,
      0, 0, 5, 8);
      
    let expected = matrix(4,
      0, 9, 1, 0,
      9, 8, 8, 0,
      3, 0, 5, 5,
      0, 8, 3, 8);
      
    t.equal(transpose(m), expected);
  });
  
  t.test('transposing the identity matrix', t => {
    t.equal(transpose(identity), identity);
  });
  
  t.test('calculating the determinant of a 2x2 matrix', t => {
    let a = matrix(2,
      1, 5,
      -3, 2);
      
    t.equal(determinant(a), 17);
  });
  
  t.test('a submatrix of a 3x3 matrix is a 2x2 matrix', t => {
    let a = matrix(3,
      1, 5, 0,
      -3, 2, 7,
      0, 6, -3);
      
    let expected = matrix(2, -3, 2, 0, 6);
    
    t.equal(submatrix(a, 0, 2), expected);
  });
  
  t.test('a submatrix of a 4x4 matrix is a 3x3 matrix', t => {
    let a = matrix(4,
      -6, 1, 1, 6,
      -8, 5, 8, 6,
      -1, 0, 8, 2,
      -7, 1, -1, 1);
      
    let expected = matrix(3,
      -6, 1, 6,
      -8, 8, 6,
      -7, -1, 1);
    
    t.equal(submatrix(a, 2, 1), expected);
  });
  
  t.test('calculating the minor of a 3x3 matrix', t => {
    let a = matrix(3,
      3, 5, 0,
      2, -1, 7,
      6, 1, 5);
    
    t.equal(determinant(submatrix(a, 1, 0)), 25);
    t.equal(minor(a, 1, 0), 25);
  });
  
  t.test('calculating a cofactor of a 3x3 matrix', t => {
    let a = matrix(3,
      3, 5, 0,
      2, -1, -7,
      6, -1, 5);
      
    t.equal(minor(a, 0, 0), -12);
    t.equal(cofactor(a, 0, 0), -12);
    t.equal(minor(a, 1, 0), 25);
    t.equal(cofactor(a, 1, 0), -25);
  });

  t.test('calculating the determinant of a 3x3 matrix', t => {
    let a = matrix(3,
      1, 2, 6,
      -5, 8, -4,
      2, 6, 4);

    t.equal(cofactor(a, 0, 0), 56);
    t.equal(cofactor(a, 0, 1), 12);
    t.equal(cofactor(a, 0, 2), -46);
    t.equal(determinant(a), -196);
  });

  t.test('calculating the determinant of a 4x4 matrix', t => {
    let a = matrix(4,
      -2, -8, 3, 5,
      -3, 1, 7, 3,
      1, 2, -9, 6,
      -6, 7, 7, -9);

    t.equal(cofactor(a, 0, 0), 690);
    t.equal(cofactor(a, 0, 1), 447);
    t.equal(cofactor(a, 0, 2), 210);
    t.equal(cofactor(a, 0, 3), 51);
    t.equal(determinant(a), -4071);
  });
  
  t.test('testing an invertible matrix for invertibility', t => {
    let a = matrix(4,
      6, 4, 4, 4,
      5, 5, 7, 6,
      4, -9, 3, -7,
      9, 1, 7, -6);
      
    t.equal(determinant(a), -2120);
    t.ok(isInvertible(a));
  });
  
  t.test('testing a noninvertible matrix for invertibility', t => {
    let a = matrix(4,
      -4, 2, -2, -3,
      9, 6, 2, 6,
      0, -5, 1, -5,
      0, 0, 0, 0 
      );
      
    t.equal(determinant(a), 0);
    t.notOk(isInvertible(a));
  });
  
  t.test('testing the inverse of a matrix', t => {
    let a = matrix(4,
      -5, 2, 6, -8,
      1, -5, 1, 8,
      7, 7, -6, -7,
      1, -3, 7, 4);
      
    let b = inverse(a);
    
    t.equal(determinant(a), 532);
    t.equal(cofactor(a, 2, 3), -160);
    t.equal(b[3][2], -160/532);
    t.equal(cofactor(a, 3, 2), 105);
    t.equal(b[2][3], 105/532);
    
    t.ok(equal(b, matrix(4,
      0.21805, 0.45113, 0.24060, -0.04511,
      -0.80827, -1.45677, -0.44361, 0.52068,
      -0.07895, -0.22368, -0.05263, 0.19737, 
      -0.52256, -0.81391, -0.30075, 0.30639)));
  });
  
  t.test('calculating the inverse of another matrix', t => {
    let m = matrix(4,
      8, -5, 9, 2,
      7, 5, 6, 1,
      -6, 0, 9, 6,
      -3, 0, -9, -4);
    
    t.ok(equal(inverse(m), matrix(4,
      -0.15385, -0.15385, -0.28205, -0.53846,
      -0.07692, 0.12308, 0.02564, 0.03077,
      0.35897, 0.35897, 0.43590, 0.92308,
      -0.69231, -0.69231, -0.76923, -1.92308)));
  });

  t.test('calculating the inverse of a third matrix', t => {
    let m = matrix(4,
      9, 3, 0, 9,
      -5, -2, -6, -3,
      -4, 9, 6, 4,
      -7, 6, 6, 2);
    
    t.ok(equal(inverse(m), matrix(4,
      -0.04074, -0.07778, 0.14444, -0.22222,
      -0.07778, 0.03333, 0.36667, -0.33333,
      -0.02901, -0.14630, -0.10926, 0.12963,
      0.17778, 0.06667, -0.26667, 0.33333)));
  });

  t.test('multiplying a product by its inverse', t => {
    let a = matrix(4,
      3,-9,7,3,
      3,-8,2,-9,
      -4,4,4,1,
      -6,5,-1,1);

    let b = matrix(4,
      8,2,2,2,
      3,-1,7,0,
      7,0,5,4,
      6,-2,0,5);

    let c = multiply(a, b);

    t.ok(equal(multiply(c, inverse(b)), a));
  });
});