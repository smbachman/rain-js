const Spheres = require('../src/spheres.js');
const Rays = require('../src/rays.js');
const Tuples = require('../src/tuples.js');
const Matrices = require('../src/matrices.js');
const {scaling, rotationZ, shearing} = require('../src/transformations.js');
const {hit} = require('../src/intersections.js');
const {color} = require("../src/colors.js");
const {canvas, writePixel, jimpScan} = require("../src/canvas.js");
const Jimp = require('jimp');

const sphere = Spheres.sphere();
Spheres.setTransform(sphere, 
  Matrices.multiply(shearing(1, 0, 0, 0, 0, 0), scaling(20, 40, 40)));

const c = canvas(100, 100);
const red = color(1, 0, 0);

for (let y = 0; y < c.height; y++) {
  console.log(`y ${y}`);
  
  for (let x = 0; x < c.width; x++) {
    let wx = x - 50;
    let wy = y - 50;
    
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