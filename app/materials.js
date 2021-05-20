(function (Rain) {

  function material(options) {
    return Object.assign({
      color: Rain.color(1, 1, 1),
      ambient: 0.1,
      diffuse: 0.9,
      specular: 0.9,
      shininess: 200
    }, options);
  }
  
  function lighting(material, light, point, eyev, normalv, inShadow) {
    const effectiveColor = Rain.hadamardProduct(material.color, light.intensity);
    const lightv = Rain.normalize(Rain.subtractTuples(light.position, point));
    const ambient = Rain.multiplyColor(effectiveColor, material.ambient);
    const lightDotNormal = Rain.dot(lightv, normalv);
    
    let diffuse, specular;
    
    if (lightDotNormal < 0) {
      diffuse = Rain.color(0, 0, 0);
      specular = Rain.color(0, 0, 0);
    } else {
      diffuse = Rain.multiplyColor(effectiveColor, material.diffuse * lightDotNormal);
      const reflectv = Rain.reflect(Rain.negateTuple(lightv), normalv);
      const reflectDotEye = Rain.dot(reflectv, eyev);
      
      if (reflectDotEye <= 0) {
        specular = Rain.color(0, 0, 0);
      } else {
        const factor = Math.pow(reflectDotEye, material.shininess);
        specular = Rain.multiplyColor(light.intensity, material.specular * factor);
      }
    }
    
    const color = inShadow 
      ? ambient 
      : Rain.addColors(Rain.addColors(ambient, diffuse), specular);
      
    color[3] = 1;
    
    return color;
  }

  Rain.material = material;
  Rain.lighting = lighting;
  
})(Rain);