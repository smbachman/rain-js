const {floatEqual} = require('./comparison.js');
const {tuple} = require('./tuples.js');

function matrix(width, height, ...args) {
  let m = new Array(height);

  let i = 0;

  for (let row = 0; row < height; row++) {
    m[row] = new Array(width);
    for (let column = 0; column < width; column++) {
      m[row][column] = args[i++] || 0;
    }
  }

  return m;
}

function equal(a, b) {
  for (let x = 0; x < a.length; x++) {
    for (let y = 0; y < a[0].length; y++) {
      if (!floatEqual(a[x][y], b[x][y])) {
        return false;
      }
    }
  }
  
  return true;
}

function multiply(a, b) {
  let m = matrix(4, 4);
  
  for (let x = 0; x < a.length; x++) {
    for (let y = 0; y < a[0].length; y++) {
      m[x][y] = a[x][0] * b[0][y] 
        + a[x][1] * b[1][y] 
        + a[x][2] * b[2][y] 
        + a[x][3] * b[3][y];
    }
  }
  
  return m;
}

function multiplyTuple(m, t) {
  let tm = matrix(4, 4,
    t.x, 0, 0, 0, 
    t.y, 0, 0, 0,
    t.z, 0, 0, 0,
    t.w, 0, 0, 0);
  
  let result = multiply(m, tm);
  
  return tuple(result[0][0], result[1][0], result[2][0], result[3][0]);
}

let identity = matrix(4, 4,
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1);
  
function transpose(m) {
  let result = matrix(4, 4);
  
  for (let x = 0; x < m.length; x++) {
    for (let y = 0; y < m[0].length; y++) {
      result[x][y] = m[y][x];
    }
  }
  
  return result;
}

function submatrix(m, row, column) {
  let result = matrix(m.length - 1, m[0].length - 1);
  
  for (let x = 0; x < m.length; x++) {
    let rx, ry;
    if (x !== row) {
      rx = x > row ? x - 1 : x;
      for (let y = 0; y < m[0].length; y++) {
        if (y !== column) {
          ry = y > column ? y - 1 : y;
          result[rx][ry] = m[x][y];
        }
      }
    }
  }
  
  return result;
}

function minor(m, row, column) {
  return determinant(submatrix(m, row, column));
}

function cofactor(m, row, column) {
  let mr = minor(m, row, column);  
  return ((row + column) % 2 === 0) ? mr : -mr;
}

function determinant(m) {
  let d = 0;
  
  if (m.length === 2) {
    d = m[0][0] * m[1][1] - m[0][1] * m[1][0];
  } else {
    for (let column = 0; column < m.length; column++) {
      d += m[0][column] * cofactor(m, 0, column);
    } 
  }
  
  return d;
}

function isInvertible(m) {
  return determinant(m) !== 0;
}

function inverse(m) {
  if (!isInvertible(m)) throw new Error('cannot invert');
  
  let m2 = matrix(m.length, m.length);
  let d = determinant(m);
  
  for (let row = 0; row < m.length; row++) {
    for (let column = 0; column < m.length; column++) {
      let c = cofactor(m, row, column);
      
      m2[column][row] = c / d;
    }
  }
  
  return m2;
}

module.exports = { matrix, equal, multiply, multiplyTuple, identity, transpose, determinant, submatrix, minor, cofactor, isInvertible, inverse };