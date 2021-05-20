importScripts('/Local/rain/app/rain.js',
  '/Local/rain/app/tuples.js',
  '/Local/rain/app/colors.js',
  '/Local/rain/app/canvas.js',
  '/Local/rain/app/matrices.js',
  '/Local/rain/app/transformations.js',
  '/Local/rain/app/materials.js',
  '/Local/rain/app/rays.js',
  '/Local/rain/app/intersections.js',
  '/Local/rain/app/spheres.js',
  '/Local/rain/app/shapes.js',
  '/Local/rain/app/planes.js',
  '/Local/rain/app/lights.js',
  '/Local/rain/app/camera.js',
  '/Local/rain/app/world.js');

onmessage = function(e) {
  const result = Rain[e.data.method](...e.data.args);
  const response = Object.assign({}, e.data, 
    { result });
    
  //console.log(response);
  postMessage(response);
}