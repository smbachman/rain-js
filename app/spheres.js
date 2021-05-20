(function (Rain) {
  
  const { identity, material, transform, subtractTuples, inverse, point, dot, multiplyMatrixTuple, transpose, normalize, intersection } = Rain;
  
  function sphere(options) {
    return Rain.shape('SPHERE', options);
  }
  
  function localIntersect(sphere, ray) {
    const sphereToRay = subtractTuples(ray.origin, point(0, 0, 0));
    
    const a = dot(ray.direction, ray.direction);
    const b = 2 * dot(ray.direction, sphereToRay);
    const c = dot(sphereToRay, sphereToRay) - 1;
    
    const discriminant = (b * b) - 4 * a * c;
    
    if (discriminant < 0) return [];
    
    const t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    const t2 = (-b + Math.sqrt(discriminant)) / (2 * a);
    
    return [intersection(t1, sphere), intersection(t2, sphere)];
  }
  
  function localNormalAt(shape, objectPoint) {
    return subtractTuples(objectPoint, point(0, 0, 0));
  }

  Rain.sphere = sphere;
  
  Rain.Shapes.SPHERE = { localIntersect, localNormalAt };
  
})(Rain);