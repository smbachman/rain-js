import * as Matrices from './matrices.js';

export function translation(x, y, z) {
  return Matrices.matrix(4,
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  );
}

export function scaling(x, y, z) {
  return Matrices.matrix(4,
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  );
}

export function rotationX(r) {
  return Matrices.matrix(4,
    1, 0, 0, 0,
    0, Math.cos(r), -Math.sin(r), 0,
    0, Math.sin(r), Math.cos(r), 0,
    0, 0, 0, 1
  );
}

export function rotationY(r) {
  return Matrices.matrix(4,
    Math.cos(r), 0, Math.sin(r), 0,
    0, 1, 0, 0,
    -Math.sin(r), 0, Math.cos(r), 0,
    0, 0, 0, 1
  );
}

export function rotationZ(r) {
  return Matrices.matrix(4,
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}

export function shearing(xy, xz, yx, yz, zx, zy) {
  return Matrices.matrix(4,
    1, xy, xz, 0,
    yx, 1, yz, 0,
    zx, zy, 1, 0,
    0, 0, 0, 1
  );
}
