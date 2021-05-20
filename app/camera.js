(function (Rain) {
  
  const { multiplyMatrixTuple: mulMT, inverse, point, normalize, subtractTuples, ray, canvas, writePixel } = Rain;
  
  function camera(hsize, vsize, fieldOfView) {
    const halfView = Math.tan(fieldOfView / 2);
    const aspect = hsize / vsize;
    
    const halfWidth = aspect >= 1 ? halfView : halfView * aspect;
    const halfHeight = aspect >= 1 ? halfView / aspect : halfView;
    
    return {
      hsize,
      vsize,
      fieldOfView,
      transform: Rain.identity,
      halfWidth,
      halfHeight,
      pixelSize: (halfWidth * 2) / hsize
    };
  }
  
  function rayForPixel(camera, px, py) {
    const xoffset = (px + 0.5) * camera.pixelSize;
    const yoffset = (py + 0.5) * camera.pixelSize;
    
    const worldX = camera.halfWidth - xoffset;
    const worldY = camera.halfHeight - yoffset;
    
    const pixel = mulMT(inverse(camera.transform), point(worldX, worldY, -1));
    const origin = mulMT(inverse(camera.transform), point(0, 0, 0));
    const direction = normalize(subtractTuples(pixel, origin));
    
    return ray(origin, direction);
  }
  
  function partialRender(camera, world, sx, sy, w, h) {
    const image = canvas(w, h);
    
    for (let y = sy; y < sy + h; y++) {
      for (let x = sx; x < sx + w; x++) {
        const ray = rayForPixel(camera, x, y);
        const color = Rain.colorAt(world, ray);
        writePixel(image, x - sx, y - sy, color);
      }
    }
    
    return image;
  }
  
  function render(camera, world) {
    return partialRender(camera, world, 0, 0, camera.hsize, camera.vsize);
  }

  Rain.camera = camera;
  Rain.rayForPixel = rayForPixel;
  Rain.partialRender = partialRender;
  Rain.render = render;
  
})(Rain);

