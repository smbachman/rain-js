(function (Rain) {
  
  const { pointLight, point, color, sphere, setTransform, scaling, lighting, hit, prepareComputations } = Rain;
  
  function world(light, objects) {
    return { light, objects };
  }
  
  function defaultWorld() {
    const light = pointLight(point(-10, 10, -10), color(1, 1, 1));
      
    const s1 = sphere();
    s1.material.color = color(0.8, 1, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
    
    const s2 = sphere();
    setTransform(s2, scaling(0.5, 0.5, 0.5));
    
    return world(light, [s1, s2]);
  }
  
  function intersectWorld(world, ray) {
    let xs = [];
    world.objects.forEach(o => {
      xs = [...xs, ...Rain.intersect(o, ray)];
    });
    return Rain.intersections(...xs);
  }
  
  function isShadowed(world, point) {
    const v = Rain.subtractTuples(world.light.position, point);
    const distance = Rain.magnitude(v);
    const direction = Rain.normalize(v);
    
    const r = Rain.ray(point, direction);
    const intersections = intersectWorld(world, r);
    
    const h = Rain.hit(intersections);
    if (h && h.t < distance) {
      return true;
    } else {
      return false;
    }
  }
  
  function shadeHit(world, comps) {
    const shadowed = isShadowed(world, comps.overPoint);
    return lighting(comps.object.material, world.light, comps.point, comps.eyev, comps.normalv, shadowed);
  }
  
  function colorAt(world, ray) {
    const xs = intersectWorld(world, ray);
    const hit = Rain.hit(xs);
    
    if (!hit) {
      return color(0, 0, 0);
    }
    
    const comps = prepareComputations(hit, ray);
    return shadeHit(world, comps);
  }

  Rain.world = world;
  Rain.defaultWorld = defaultWorld;
  Rain.intersectWorld = intersectWorld;
  Rain.shadeHit = shadeHit;
  Rain.colorAt = colorAt;
  Rain.isShadowed = isShadowed;
  
})(Rain);