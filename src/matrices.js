const {floatEqual} = require('./comparison.js');

function matrix(...args) {
  let m = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];  

  for (let i = 0; i < args.length; i++)
  {
    let x = i % 4;
    let y = Math.floor(i / 4);
    m[y][x] = args[i];
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
  let m = matrix();
  
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

module.exports = { matrix, equal, multiply };