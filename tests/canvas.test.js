const {test} = require('zora');
const {canvas, writePixel, pixelAt, canvasToPpm, canvasToImageData} = require('../src/canvas.js');
const {color} = require('../src/colors.js');
const {floatEqual} = require('../src/comparison.js');

test('canvas', function (t) {
  
  t.test('Creating a canvas', function() {
    let c = canvas(10, 20);
    t.equal(c.width, 10);
    t.equal(c.height, 20);
    t.ok(c.pixels
      .every(row => row
        .every(p => p.red === 0 && p.green === 0 && p.blue === 0)));
    t.equal(c.pixels.length, 10);
    t.ok(c.pixels.every(row => row.length === 20));
  });
  
  t.test('Writing pixels to a canvas', function() {
    let c = canvas(10, 20);
    let red = color(1, 0, 0);
    writePixel(c, 2, 3, red);
    t.equal(pixelAt(c, 2, 3), red);
  });
  
  t.test('Constructing the PPM header', function() {
    let c = canvas(5, 3);
    let ppm = canvasToPpm(c);
    t.equal(ppm, `P3
5 3
255`);
  });
  
  t.test('Creating the ImageData clamped array', function() {
    let c = canvas(5, 3);
    let c1 = color(1.5, 0, 0);
    let c2 = color(0, 0.5, 0);
    let c3 = color(-0.5, 0, 1);
    writePixel(c, 0, 0, c1);
    writePixel(c, 2, 1, c2);
    writePixel(c, 4, 2, c3);
    let imageData = canvasToImageData(c);
    t.equal(imageData[0], 255);
    t.equal(imageData[29], 127.5);
    t.equal(imageData[56], 0);
    t.equal(imageData[58], 255);
  });
});