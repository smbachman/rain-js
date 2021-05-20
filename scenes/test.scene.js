Rain.pollute(window);

const start = Date.now();

/*
const floor = sphere({
  transform: scaling(10, 0.01, 10),
  material: material({
    color: color(1, 0.9, 0.9),
    specular: 0
  })
});

const leftWall = sphere({
  transform: [
    translation(0, 0, 5), 
    rotationY(-Math.PI/4),
    rotationX(Math.PI/2),
    scaling(10, 0.01, 10)
  ].reduce(multiplyMatrices, identity),
  material: floor.material
});

const rightWall = sphere();
rightWall.transform = [
  translation(0, 0, 5),
  rotationY(Math.PI/4),
  rotationX(Math.PI/2),
  scaling(10, 0.01, 10)
  ].reduce(multiplyMatrices, identity);
rightWall.material = floor.material;
*/

const floor = plane({
  material: material({
    color: color(1, 0.9, 0.9),
    specular: 0
  })
});

const middle = sphere();
middle.transform = translation(-0.5, 1, 0.5);
middle.material = material();
middle.material.color = color(0.1, 1, 0.5);
middle.material.diffuse = 0.7;
middle.material.specular = 0.3;

const right = sphere()
right.transform = multiplyMatrices(translation(1.5, 0.5, -0.5), scaling(0.5, 0.5, 0.5));
right.material = material();
right.material.color = color(0.5, 1, 0.1);
right.material.diffuse = 0.7;
right.material.specular = 0.3;

const left = sphere();
left.transform = multiplyMatrices(translation(-1.5, 0.33, -0.75), scaling(0.33, 0.33, 0.33));
left.material = material();
left.material.color = color(1, 0.8, 0.1);
left.material.diffuse = 0.7;
left.material.specular = 0.3;

const light = pointLight(point(-10, 10, -10), color(1, 1, 1));

const w = world(light, [floor, /*leftWall, rightWall,*/ middle, right, left]);

const c = camera(200, 100, Math.PI/3);
c.transform = viewTransform(point(0, 1.5, -5),
  point(0, 1, 0),
  vector(0, 1, 0)); 
  
const canvasElement = document.getElementById('image');
const context = canvasElement.getContext('2d');
let messageCount = 0;
//const canvas = render(c, w);
const pool = workerPool(6, e => {
  //console.log(e.data.args);
  if (e.data.method === 'partialRender') {
    const x = e.data.args[2];
    const y = e.data.args[3];
    const canvas = e.data.result;
    context.putImageData(canvasToImageData(canvas), x, y);
    
    if (--messageCount === 0) {
      const end = Date.now();
      console.log(`elapsed ${end - start}`);    
    }
  }
});

// line by line
const subWidth = c.hsize / 2;
const subHeight = 1;

// block by block
// const subWidth = c.hsize / 10;
// const subHeight = c.vsize / 10;

// fixed size blocks
// const subWidth = 10;
// const subHeight = 10;


for (var y = 0; y < c.vsize; y += subHeight) {
  for (var x = 0; x < c.hsize; x += subWidth) {  
    postRain(pool, 'partialRender', c, w, x, y, subWidth, subHeight);
    messageCount++;
  }
}
