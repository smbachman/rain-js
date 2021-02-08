const {point, vector, normalize, multiply} = require("../src/tuples.js");
const {projectile, environment, tick} = require("./projectile.js");
const {color} = require("../src/colors.js");
const {canvas, writePixel, pixelAt, jimpScan} = require("../src/canvas.js");
const Jimp = require('jimp');

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
