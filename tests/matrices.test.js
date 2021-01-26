const {test} = require('zora');
const {matrix, equal, multiply, multiplyTuple, identity, transpose, 
  determinant, submatrix, minor, cofactor} = require('../src/matrices.js');
const {tuple} = require('../src/tuples.js');

test('matrices', function (t) {
  
  t.test('Constructing and inspecting a 4x4 matrix', function() {
    let m = matrix(4, 4,
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
    let m = matrix(2, 2,
      -3, 5,
      1, -2
    );
    
    t.equal(m[0][0], -3);
    t.equal(m[0][1], 5);
    t.equal(m[1][0], 1);
    t.equal(m[1][1], -2);
  });
  
  t.test('A 3x3 matrix ought to be representable', function() {
    let m = matrix(3, 3,
      -3, 5, 0,
      1, -2, -7,
      0, 1, 1
    );
    
    t.equal(m[0][0], -3);
    t.equal(m[1][1], -2);
    t.equal(m[2][2], 1);
  });
  
  t.test('matrix equality with identical matrices', function() {
    let a = matrix(4, 4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4, 4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    t.ok(equal(a,b));
  });
  
  t.test('matrix equality with different matrices', function() {
    let a = matrix(4, 4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4, 4,
      0,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    t.notOk(equal(a,b));
  });
  
  t.test('Multiplying two matrices', function(t) {
    let a = matrix(4, 4, 
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2);
      
    let b = matrix(4, 4,
      -2, 1, 2, 3,
      3, 2, 1, -1,
      4, 3, 6, 5,
      1, 2, 7, 8);
      
    let result = matrix(4, 4,
      20, 22, 50, 48,
      44, 54, 114, 108,
      40, 58, 110, 102,
      16, 26, 46, 42
    );
      
    t.ok(equal(multiply(a, b), result));
  });
  
  t.test('a matrix multiplied by a tuple', t => {
    let a = matrix(4, 4,
      1, 2, 3, 4,
      2, 4, 4, 2,
      8, 6, 4, 1,
      0, 0, 0, 1);
      
    let b = tuple(1, 2, 3, 1);
    
    let result = multiplyTuple(a, b);
    
    t.equal(result, tuple(18, 24, 33, 1));
  });
  
  t.test('multiplying a matrix by the identity matrix', t => {
    let m = matrix(4, 4,
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
    let m = matrix(4, 4,
      0, 9, 3, 0,
      9, 8, 0, 8,
      1, 8, 5, 3,
      0, 0, 5, 8);
      
    let expected = matrix(4, 4,
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
    let a = matrix(2, 2,
      1, 5,
      -3, 2);
      
    t.equal(determinant(a), 17);
  });
  
  t.test('a submatrix of a 3x3 matrix is a 2x2 matrix', t => {
    let a = matrix(3, 3,
      1, 5, 0,
      -3, 2, 7,
      0, 6, -3);
      
    let expected = matrix(2, 2, -3, 2, 0, 6);
    
    t.equal(submatrix(a, 0, 2), expected);
  });
  
  t.test('a submatrix of a 4x4 matrix is a 3x3 matrix', t => {
    let a = matrix(4, 4,
      -6, 1, 1, 6,
      -8, 5, 8, 6,
      -1, 0, 8, 2,
      -7, 1, -1, 1);
      
    let expected = matrix(3, 3,
      -6, 1, 6,
      -8, 8, 6,
      -7, -1, 1);
    
    t.equal(submatrix(a, 2, 1), expected);
  });
  
  t.test('calculating the minor of a 3x3 matrix', t => {
    let a = matrix(3, 3,
      3, 5, 0,
      2, -1, 7,
      6, 1, 5);
      
    t.equal(minor(a, 1, 0), determinant(submatrix(a, 1, 0)));
  });
  
  t.test('calculating a cofactor of a 3x3 matrix', t => {
    let a = matrix(3, 3,
      3, 5, 0,
      2, -1, -7,
      6, -1, 5);
      
    t.equal(cofactor(a, 0, 0), -12);
    t.equal(cofactor(a, 1, 0), -25);
  });

  t.test('calculating the determinant of a 3x3 matrix', t => {
    let a = matrix(3, 3,
      1, 2, 6,
      -5, 8, -4,
      2, 6, 4);

    t.equal(cofactor(a, 0, 0), 56);
    t.equal(cofactor(a, 0, 1), 12);
    t.equal(cofactor(a, 0, 2), -46);
    t.equal(determinant(a), -196);
  });

  t.test('calculating the determinant of a 4x4 matrix', t => {
    let a = matrix(4, 4,
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
});