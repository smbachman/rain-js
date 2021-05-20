import * as C from './colors.js';
import * as T from './tuples.js';

export function material() {
  return {
    color: C.color(1, 1, 1),
    ambient: 0.1,
    diffuse: 0.9,
    specular: 0.9,
    shininess: 200
  };
}

export function lighting(material, light, point, eyev, normalv) {
  const effectiveColor = C.hadamardProduct(material.color, light.intensity);
  const lightv = T.normalize(T.subtract(light.position, point));
  const ambient = C.multiply(effectiveColor, material.ambient);
  const lightDotNormal = T.dot(lightv, normalv);
  
  let diffuse, specular;
  
  if (lightDotNormal < 0) {
    diffuse = C.color(0, 0, 0);
    specular = C.color(0, 0, 0);
  } else {
    diffuse = C.multiply(effectiveColor, material.diffuse * lightDotNormal);
    const reflectv = T.reflect(T.negate(lightv), normalv);
    const reflectDotEye = T.dot(reflectv, eyev);
    
    if (reflectDotEye <= 0) {
      specular = C.color(0, 0, 0);
    } else {
      const factor = Math.pow(reflectDotEye, material.shininess);
      specular = C.multiply(light.intensity, material.specular * factor);
    }
  }
  
  const color = C.add(C.add(ambient, diffuse), specular);
  color[3] = 1;
  
  return color;
}
