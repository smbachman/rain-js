(function (Rain) {

  function translation(x, y, z) {
    return Rain.matrix(4,
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1
    );
  }
  
  function scaling(x, y, z) {
    return Rain.matrix(4,
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1
    );
  }
  
  function rotationX(r) {
    return Rain.matrix(4,
      1, 0, 0, 0,
      0, Math.cos(r), -Math.sin(r), 0,
      0, Math.sin(r), Math.cos(r), 0,
      0, 0, 0, 1
    );
  }
  
  function rotationY(r) {
    return Rain.matrix(4,
      Math.cos(r), 0, Math.sin(r), 0,
      0, 1, 0, 0,
      -Math.sin(r), 0, Math.cos(r), 0,
      0, 0, 0, 1
    );
  }
  
  function rotationZ(r) {
    return Rain.matrix(4,
      Math.cos(r), -Math.sin(r), 0, 0,
      Math.sin(r), Math.cos(r), 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }
  
  function shearing(xy, xz, yx, yz, zx, zy) {
    return Rain.matrix(4,
      1, xy, xz, 0,
      yx, 1, yz, 0,
      zx, zy, 1, 0,
      0, 0, 0, 1
    );
  }
  
  function viewTransform(from, to, up) {
    const forward = Rain.normalize(Rain.subtractTuples(to, from));
    const upn = Rain.normalize(up);
    const left = Rain.cross(forward, upn);
    const trueUp = Rain.cross(left, forward);
    
    const orientation = Rain.matrix(4,
      left.x, left.y, left.z, 0,
      trueUp.x, trueUp.y, trueUp.z, 0,
      -forward.x, -forward.y, -forward.z, 0,
      0, 0, 0, 1);
      
    return Rain.multiplyMatrices(orientation, translation(-from.x, -from.y, -from.z));
  }

  Rain.translation = translation;
  Rain.scaling = scaling;
  Rain.rotationX = rotationX;
  Rain.rotationY = rotationY;
  Rain.rotationZ = rotationZ;
  Rain.shearing = shearing;
  Rain.viewTransform = viewTransform;
  
})(Rain);