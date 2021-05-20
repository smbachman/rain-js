(function (Rain) {
  
  const { shape, vector, intersection  } = Rain;
  
  function plane(options) {
    return shape('PLANE', options);
  }
  
  function localIntersect(shape, ray) {
    if (Math.abs(ray.direction.y) < Rain.epsilon) {
      return [];
    }
    
    const t = -ray.origin.y / ray.direction.y;
    
    return [intersection(t, shape)]; 
  }
  
  function localNormalAt(shape, point) {
    return vector(0, 1, 0);
  }
  
  Rain.Shapes.PLANE = { localIntersect, localNormalAt };
  
  Rain.plane = plane;
  
})(Rain);