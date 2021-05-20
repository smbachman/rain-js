import {test} from './zora.js';
import {floatEqual} from '../src/comparison.js';
import {color} from '../src/colors.js';
import {material, lighting} from '../src/materials.js';
import {pointLight} from '../src/lights.js';
import * as T from '../src/tuples.js';
import * as M from '../src/matrices.js';

test('materials', t => {
  
  t.test('The default material', t => {
    const m = material();
    t.equal(m.color, color(1, 1, 1));
    t.equal(m.ambient, 0.1);
    t.equal(m.diffuse, 0.9);
    t.equal(m.specular, 0.9);
    t.equal(m.shininess, 200);
  });
  
  const m = material();
  const position = T.point(0, 0, 0);
  
  t.test('Lighting with the eye between the light and the surface', t => {
    const eyev = T.vector(0, 0, -1);
    const normalv = T.vector(0, 0, -1);
    const light = pointLight(T.point(0, 0, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    t.equal(result, color(1.9, 1.9, 1.9));
  });
  
  t.test('Lighting with the eye between light and surface, eye offset 45 degrees', t => {
    const eyev = T.vector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    const normalv = T.vector(0, 0, -1);
    const light = pointLight(T.point(0, 0, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    t.equal(result, color(1.0, 1.0, 1.0));
  });
  
  t.test('Lighting with the eye opposite surface, light offset 45 degrees', t => {
    const eyev = T.vector(0, 0, -1);
    const normalv = T.vector(0, 0, -1);
    const light = pointLight(T.point(0, 10, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    t.ok(floatEqual(result.red, 0.7364));
    t.ok(floatEqual(result.green, 0.7364));
    t.ok(floatEqual(result.blue, 0.7364));
  });

  t.test('Lighting with eye in the path of the reflection vector', t => {
    const eyev = T.vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    const normalv = T.vector(0, 0, -1);
    const light = pointLight(T.point(0, 10, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    t.ok(floatEqual(result.red, 1.6364));
    t.ok(floatEqual(result.green, 1.6364));
    t.ok(floatEqual(result.blue, 1.6364));
  });
  
  t.test('Lighting with the light behind the surface', t => {
    const eyev = T.vector(0, 0, -1);
    const normalv = T.vector(0, 0, -1);
    const light = pointLight(T.point(0, 0, 10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    t.ok(floatEqual(result.red, 0.1));
    t.ok(floatEqual(result.green, 0.1));
    t.ok(floatEqual(result.blue, 0.1));
  });
    
});