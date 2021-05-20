(function (Rain) {
  
  const { identity, material, transform, inverse, multiplyMatrixTuple, transpose, normalize } = Rain;
  
  function shape(type, options) {
    return Object.assign({ type, transform: identity, material: material() }, options);
  }
  
  function testShape(options) {
    return shape('ABSTRACT', options);
  }
  
  function setTransform(s, t) {
    s.transform = t;
  }
  
  function localIntersect(shape, ray) {
    shape.savedRay = ray;
  }
  
  function localNormalAt(shape, localPoint) {
    return localPoint;
  }
  
  Rain.Shapes.ABSTRACT = { localIntersect, localNormalAt };
  
  function intersect(shape, ray) {
    const localRay = transform(ray, inverse(shape.transform));
    return Rain.Shapes[shape.type].localIntersect(shape, localRay);
  }
  
  function normalAt(shape, point) {
    const localPoint = multiplyMatrixTuple(inverse(shape.transform), point);
    const localNormal = Rain.Shapes[shape.type].localNormalAt(shape, localPoint);
    const worldNormal = multiplyMatrixTuple(transpose(inverse(shape.transform)), localNormal);
    worldNormal[3] = 0;
    return normalize(worldNormal);
  }
  
  Rain.shape = shape;
  Rain.testShape = testShape;
  Rain.setTransform = setTransform;
  Rain.intersect = intersect;
  Rain.normalAt = normalAt;
  
})(Rain);