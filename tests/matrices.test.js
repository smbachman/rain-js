const {test} = require('zora');
const {matrix, equal, multiply} = require('../src/matrices.js');

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
  
});