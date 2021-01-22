const epsilon = 0.00001

function floatEqual(a, b) {
  return Math.abs(a - b) < epsilon;
}

export function equal(a, b) {
  for (let x = 0; x < a.length; x++) {
    for (let y = 0; y < a[0].length; y++) {
      if (!floatEqual(a[x][y], b[x][y])) {
        return false;
      }
    }
  }
  
  return true;
}

export function matrix() {
  return [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
}

export function multiply(a, b) {
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