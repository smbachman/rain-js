import * as T from '../src/tuples.js';
import * as M from '../src/matrices.js';
import * as X from '../src/transformations.js';
import * as I from '../src/intersections.js';
import * as C from "../src/colors.js";
import * as Ml from "../src/materials.js";
import * as Spheres from '../src/spheres.js';
import * as Lights from '../src/lights.js';
import * as Rays from '../src/rays.js';
import * as Camera from "../src/camera.js";
import * as Canvas from "../src/canvas.js";
import * as World from "../src/world.js";
import {floatEqual} from '../src/comparison.js';
import * as Pool from '../workers/worker-pool.js';

const start = Date.now();

const floor = Spheres.sphere();
floor.transform = X.scaling(10, 0.01, 10);
floor.material = Ml.material();
floor.material.color = C.color(1, 0.9, 0.9);
floor.material.specular = 0;

const leftWall = Spheres.sphere();
leftWall.transform = M.multiply( 
  X.translation(0, 0, 5),
  X.rotationY(-Math.PI/4),
  X.rotationX(Math.PI/2),
  X.scaling(10, 0.01, 10));
leftWall.material = floor.material;

const rightWall = Spheres.sphere();
rightWall.transform = M.multiply(
  X.translation(0, 0, 5),
  X.rotationY(Math.PI/4),
  X.rotationX(Math.PI/2),
  X.scaling(10, 0.01, 10));
rightWall.material = floor.material;

const middle = Spheres.sphere();
middle.transform = X.translation(-0.5, 1, 0.5);
middle.material = Ml.material();
middle.material.color = C.color(0.1, 1, 0.5);
middle.material.diffuse = 0.7;
middle.material.specular = 0.3;

const right = Spheres.sphere()
right.transform = M.multiply(X.translation(1.5, 0.5, -0.5), X.scaling(0.5, 0.5, 0.5));
right.material = Ml.material();
right.material.color = C.color(0.5, 1, 0.1);
right.material.diffuse = 0.7;
right.material.specular = 0.3;

const left = Spheres.sphere();
left.transform = M.multiply(X.translation(-1.5, 0.33, -0.75), X.scaling(0.33, 0.33, 0.33));
left.material = Ml.material();
left.material.color = C.color(1, 0.8, 0.1);
left.material.diffuse = 0.7;
left.material.specular = 0.3;

const light = Lights.pointLight(T.point(-10, 10, -10), C.color(1, 1, 1));

const world = World.world(light, [floor, leftWall, rightWall, middle, right, left]);

const camera = Camera.camera(100, 50, Math.PI/3);
camera.transform = X.viewTransform(T.point(0, 1.5, -5),
  T.point(0, 1, 0),
  T.vector(0, 1, 0)); 
  
function messageHandler(e) {
  console.log('message received', e.data);
  
  const canvas = Camera.render(camera, world);
  
  const canvasElement = document.getElementById('image');
  const context = canvasElement.getContext('2d');
  context.putImageData(Canvas.canvasToImageData(e.data), 0, 0);
};

const pool = Pool.createPool(1, messageHandler, 
  { camera, world, T, M, I, X, C, Ml, Spheres, Canvas, Lights, Rays, Camera, World, 
    floatEqual,
    defineColorProperties: C.defineColorProperties,
    rayForPixel: Camera.rayForPixel,
    isInvertible: M.isInvertible,
    determinant: M.determinant,
    cofactor: M.cofactor,
    minor: M.minor,
    submatrix: M.submatrix,
    matrix: M.matrix,
    multiplyMatrix: M.multiply,
    tuple: T.tuple,
    magnitude: T.magnitude,
    defineTupleProperties: T.defineTupleProperties,
    intersectWorld: World.intersectWorld,
    ray: Rays.ray,
    shadeHit: World.shadeHit,
    color: C.color,
    subtractTuple: T.subtract,
    multiplyScalar: T.multiply,
    dot: T.dot });  
  
Pool.postFunction(pool, () => Camera.render(camera, world));

const end = Date.now();

console.log(`done ${end - start}`);