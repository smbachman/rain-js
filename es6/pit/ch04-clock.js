import { point } from '../src/tuples.js';
import { multiplyTuple } from '../src/matrices.js';
import {color} from "../src/colors.js";
import { rotationZ } from '../src/transformations.js';
import { canvas, writePixel, jimpScan } from "../src/canvas.js";
import * as Jimp from 'jimp';

let p = point(0, 150, 0);

let c = canvas(400, 400);
let white = color(1, 1, 1);

const r = rotationZ((2 * Math.PI) / 12);

let points = [p];

while (points.length < 13) { 
  p = multiplyTuple(r, p);
  writePixel(c, Math.round(p.x + 200), Math.round(p.y + 200), white); 
  points.push(p);
}

console.log(points);

new Jimp(c.width, c.height, (err, image) => {
  console.error(err);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, jimpScan(c));
  image.write('images/clock.png');
});

