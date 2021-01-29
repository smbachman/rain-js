const {test} = require('zora');
const Matrices = require('../src/matrices.js');
const Tuples = require('../src/tuples.js');
const {translation} = require('../src/transformations.js');

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
  })

});
