import {point, vector, normalize, multiply} from "../src/tuples.js";
import {projectile, environment, tick} from "./projectile.js";
import {color} from "../src/colors.js";
import {canvas, writePixel, pixelAt, jimpScan} from "../src/canvas.js";
import * as Jimp from 'jimp';

let p = projectile(point(0,1,0), multiply(normalize(vector(1,1.8,0)), 11.25));
let e = environment(vector(0,-0.1,0), vector(-0.01,0,0));
let c = canvas(900, 550);
let red = color(1, 0, 0);

let ticks = 0;

while (p.position.y > 0) {
  console.log(`tick ${ticks}: (${p.position.x}, ${p.position.y}, ${p.position.z})`);
  let x = Math.round(p.position.x);
  let y = 550 - Math.round(p.position.y);
  if (x >= 0 && x <= 900 && y >= 0 && y <= 550) {
    writePixel(c, x, y, red);
  }
  p = tick(e, p);
  ticks++;
}

new Jimp(c.width, c.height, (err, image) => {
  console.error(err);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, jimpScan(c));
  image.write('images/projectile.png');
});
