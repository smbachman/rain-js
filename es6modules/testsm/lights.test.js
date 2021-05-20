import {test} from './zora.js';
import {pointLight} from '../src/lights.js';
import {color} from '../src/colors.js';
import * as T from '../src/tuples.js';

test('lights', t => {
  
  t.test('A point light has a position and intensity', t => {
    const intensity = color(1, 1, 1);
    const position = T.point(0, 0, 0);
    const light = pointLight(position, intensity);
    t.equal(light.position, position);
    t.equal(light.intensity, intensity);
  });

});