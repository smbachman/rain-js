(function (Rain) {
  
  const { addTuples: addTT, multiplyTuple: mulTF, multiplyMatrixTuple: mulMT } = Rain;

  function ray(origin, direction) {
    return { origin, direction };
  }
  
  function position(ray, t) {
    return addTT(ray.origin, mulTF(ray.direction, t));
  }
  
  function transform(r, matrix) {
    return ray(mulMT(matrix, r.origin), mulMT(matrix, r.direction));
  }

  Rain.ray = ray;
  Rain.position = position;
  Rain.transform = transform;
  
})(Rain);