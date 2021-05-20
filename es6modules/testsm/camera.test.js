import {test} from './zora.js';
import {floatEqual} from '../src/comparison.js';
import * as C from '../src/colors.js';
import * as T from '../src/tuples.js';
import * as M from '../src/matrices.js';
import * as X from '../src/transformations.js';
import * as Canvas from '../src/canvas.js';
import * as Camera from '../src/camera.js';
import * as World from '../src/world.js';

test('Camera', t => {
  
  t.test('Constructing a camera', t => {
    const hsize = 160;
    const vsize = 120;
    const fieldOfView = Math.PI / 2;
    const c = Camera.camera(hsize, vsize, fieldOfView);
    t.equal(c.hsize, hsize);
    t.equal(c.vsize, vsize);
    t.equal(c.fieldOfView, fieldOfView);
    t.equal(c.transform, M.identity);
  });
  
  t.test('The pixel size for a horizontal canvas', t => {
    const c = Camera.camera(200, 125, Math.PI / 2);
    t.ok(floatEqual(c.pixelSize, 0.01));
  });
  
  t.test('The pixel size for a vertical canvas', t => {
    const c = Camera.camera(125, 200, Math.PI / 2);
    t.ok(floatEqual(c.pixelSize, 0.01));
  });
  
  t.test('Constructing a ray through the center of the canvas', t => {
    const c = Camera.camera(201, 101, Math.PI / 2);
    const r = Camera.rayForPixel(c, 100, 50);
    t.ok(T.equal(r.origin, T.point(0, 0, 0)));
    t.ok(T.equal(r.direction, T.vector(0, 0, -1)));
  });
  
  t.test('Constructing a ray through a corner of the canvas', t => {
    const c = Camera.camera(201, 101, Math.PI / 2);
    const r = Camera.rayForPixel(c, 0, 0);
    t.ok(T.equal(r.origin, T.point(0, 0, 0)));
    t.ok(T.equal(r.direction, T.vector(0.66519, 0.33259, -0.66851)));
  });

  t.test('Constructing a ray when the camera is transformed', t => {
    const c = Camera.camera(201, 101, Math.PI / 2);
    c.transform = M.multiply(X.rotationY(Math.PI / 4), X.translation(0, -2, 5));
    const r = Camera.rayForPixel(c, 100, 50);
    t.ok(T.equal(r.origin, T.point(0, 2, -5)));
    t.ok(T.equal(r.direction, T.vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2)));
  });
  
  t.test('Rendering a world with a camera', t => {
    const w = World.defaultWorld();
    const c = Camera.camera(11, 11, Math.PI / 2);
    const from = T.point(0, 0, -5);
    const to = T.point(0, 0, 0);
    const up = T.point(0, 1, 0);
    c.transform = X.viewTransform(from, to, up);
    const image = Camera.render(c, w);
    t.ok(T.equal(Canvas.pixelAt(image, 5, 5), C.color(0.38066, 0.47583, 0.2855)));
  });
});