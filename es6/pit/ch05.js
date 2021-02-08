import * as Spheres from '../src/spheres.js';
import * as Rays from '../src/rays.js';
import * as Tuples from '../src/tuples.js';
import * as Matrices from '../src/matrices.js';
import {scaling, rotationZ, shearing} from '../src/transformations.js';
import {hit} from '../src/intersections.js';
import {color} from "../src/colors.js";
import {canvas, writePixel, jimpScan} from "../src/canvas.js";
import * as Jimp from 'jimp';

const sphere = Spheres.sphere();
Spheres.setTransform(sphere, scaling(190, 190, 190));
  //Matrices.multiply(shearing(1, 0, 0, 0, 0, 0), scaling(20, 40, 40)));

const c = canvas(400, 400);
const red = color(1, 0, 0);

for (let y = 0; y < c.height; y++) {
  console.log(`y ${y}`);
  
  for (let x = 0; x < c.width; x++) {
    let wx = x - 200;
    let wy = y - 200;
    
    let ray = Rays.ray(Tuples.point(wx, wy, 0), Tuples.vector(0, 0, 1));
    
    if (hit(Spheres.intersect(sphere, ray))) {
      writePixel(c, x, y, red);
    }
  }
}

new Jimp(c.width, c.height, (err, image) => {
  console.error(err);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, jimpScan(c));
  image.write('images/sphere.png');
});

console.log('done');