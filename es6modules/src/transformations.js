import * as M from './matrices.js';
import * as T from './tuples.js';

export function translation(x, y, z) {
  return M.matrix(4,
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1
  );
}

export function scaling(x, y, z) {
  return M.matrix(4,
    x, 0, 0, 0,
    0, y, 0, 0,
    0, 0, z, 0,
    0, 0, 0, 1
  );
}

export function rotationX(r) {
  return M.matrix(4,
    1, 0, 0, 0,
    0, Math.cos(r), -Math.sin(r), 0,
    0, Math.sin(r), Math.cos(r), 0,
    0, 0, 0, 1
  );
}

export function rotationY(r) {
  return M.matrix(4,
    Math.cos(r), 0, Math.sin(r), 0,
    0, 1, 0, 0,
    -Math.sin(r), 0, Math.cos(r), 0,
    0, 0, 0, 1
  );
}

export function rotationZ(r) {
  return M.matrix(4,
    Math.cos(r), -Math.sin(r), 0, 0,
    Math.sin(r), Math.cos(r), 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
}

export function shearing(xy, xz, yx, yz, zx, zy) {
  return M.matrix(4,
    1, xy, xz, 0,
    yx, 1, yz, 0,
    zx, zy, 1, 0,
    0, 0, 0, 1
  );
}

export function viewTransform(from, to, up) {
  const forward = T.normalize(T.subtract(to, from));
  const upn = T.normalize(up);
  const left = T.cross(forward, upn);
  const trueUp = T.cross(left, forward);
  
  const orientation = M.matrix(4,
    left.x, left.y, left.z, 0,
    trueUp.x, trueUp.y, trueUp.z, 0,
    -forward.x, -forward.y, -forward.z, 0,
    0, 0, 0, 1);
    
  return M.multiply(orientation, translation(-from.x, -from.y, -from.z));
}
