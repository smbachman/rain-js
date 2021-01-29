const Matrices = require('./matrices.js');

function translation(x, y, z) {
  return Matrices.matrix(4,
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  );
}

module.exports = { translation };