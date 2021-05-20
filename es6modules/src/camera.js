import * as M from './matrices.js';
import * as T from './tuples.js';
import * as Canvas from './canvas.js';
import * as World from './world.js';
import * as Rays from './rays.js';

export function camera(hsize, vsize, fieldOfView) {
  const halfView = Math.tan(fieldOfView / 2);
  const aspect = hsize / vsize;
  
  const halfWidth = aspect >= 1 ? halfView : halfView * aspect;
  const halfHeight = aspect >= 1 ? halfView / aspect : halfView;
  
  return {
    hsize,
    vsize,
    fieldOfView,
    transform: M.identity,
    halfWidth,
    halfHeight,
    pixelSize: (halfWidth * 2) / hsize
  };
}

export function rayForPixel(camera, px, py) {
  const xoffset = (px + 0.5) * camera.pixelSize;
  const yoffset = (py + 0.5) * camera.pixelSize;
  
  const worldX = camera.halfWidth - xoffset;
  const worldY = camera.halfHeight - yoffset;
  
  const pixel = M.multiplyTuple(M.inverse(camera.transform), T.point(worldX, worldY, -1));
  const origin = M.multiplyTuple(M.inverse(camera.transform), T.point(0, 0, 0));
  const direction = T.normalize(T.subtract(pixel, origin));
  
  return Rays.ray(origin, direction);
}

export function partialRender(camera, world, sx, sy, w, h) {
  const image = Canvas.canvas(w, h);
  
  for (let y = sy; y < sy + h; y++) {
    for (let x = sx; x < sx + w; x++) {
      const ray = rayForPixel(camera, x, y);
      const color = World.colorAt(world, ray);
      Canvas.writePixel(image, x - sx, y - sy, color);
    }
  }
  
  return image;
}

export function render(camera, world) {
  return partialRender(camera, world, 0, 0, camera.hsize, camera.vsize);
}