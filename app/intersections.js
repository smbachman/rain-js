(function (Rain) {
  
  function intersection(t, object) {
    return { t, object };
  }
  
  function intersections(...args) {
    return args.sort((a, b) => a.t - b.t);
  }
  
  function hit(xs) {
    return xs.find(i => i.t > 0);
  }
  
  function prepareComputations(intersection, ray) {
    const point = Rain.position(ray, intersection.t);
    const comps = {
      t : intersection.t,
      object : intersection.object,
      point,
      eyev: Rain.negateTuple(ray.direction),
      normalv: Rain.normalAt(intersection.object, point),
      inside: false
    };
    
    if (Rain.dot(comps.normalv, comps.eyev) < 0) {
      comps.inside = true;
      comps.normalv = Rain.negateTuple(comps.normalv);
    }
    
    comps.overPoint = Rain.addTuples(comps.point, Rain.multiplyTuple(comps.normalv, Rain.epsilon));
    
    return comps;
  }

  Rain.intersection = intersection;
  Rain.intersections = intersections;
  Rain.hit = hit;
  Rain.prepareComputations = prepareComputations;
  
})(Rain);