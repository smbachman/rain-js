import * as Spheres from '../src/spheres.js';
import * as Lights from '../src/lights.js';
import * as Rays from '../src/rays.js';
import * as T from '../src/tuples.js';
import * as M from '../src/matrices.js';
import * as X from '../src/transformations.js';
import * as I from '../src/intersections.js';
import * as C from "../src/colors.js";
import * as Ml from "../src/materials.js";
import * as Canvas from "../src/canvas.js";
//import * as Jimp from 'jimp';

const start = Date.now();

const rayOrigin = T.point(0, 0, -5);
const wallZ = 10;
const wallSize = 7;
const canvasPixels = 150;
const pixelSize = wallSize / canvasPixels;
const half = wallSize / 2;

const sphere = Spheres.sphere();
sphere.material.color = C.color(0.2, 1, 1);
sphere.material.ambient = 0.1;
sphere.material.diffuse = 0.9;
sphere.material.specular = 0.9;
sphere.material.shininess = 200;

//Spheres.setTransform(sphere, //X.scaling(1, 1, 1));
  //M.multiply(X.shearing(1, 0, 0, 0, 0, 0), X.scaling(0.5, 1, 1)));
  
const lightPosition = T.point(-10, 10, -10) ;
const lightColor = C.color(1, 1, 1);
const light = Lights.pointLight(lightPosition, lightColor);

const c = Canvas.canvas(canvasPixels, canvasPixels);

for (let y = 0; y < canvasPixels; y++) {
  //console.log(`y ${y}`);
  let wy = half - pixelSize * y;
  
  for (let x = 0; x < canvasPixels; x++) {
    let wx = -half + pixelSize * x;
    
    let position = T.point(wx, wy, wallZ);
    let ray = Rays.ray(rayOrigin, T.normalize(T.subtract(position, rayOrigin)));
    let hit = I.hit(Spheres.intersect(sphere, ray));
    
    if (hit) {
      const point = Rays.position(ray, hit.t);
      const normal = Spheres.normalAt(hit.object, point);
      const eye = T.negate(ray.direction);
      const color = Ml.lighting(hit.object.material, light, point, eye, normal);
      
      Canvas.writePixel(c, x, y, color);
    }
  }
}

const canvasElement = document.getElementById('image');
const context = canvasElement.getContext('2d');
context.putImageData(Canvas.canvasToImageData(c), 0, 0);

/*
new Jimp(c.width, c.height, (err, image) => {
  console.error(err);
  
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, jimpScan(c));
  image.write('images/sphere.png');
});
*/

const end = Date.now();

console.log(`done ${end - start}`);