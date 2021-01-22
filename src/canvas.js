const {color} = require('./colors.js');

function canvas(width,height) {
  let pixels = new Array(width);
  
  for (let x = 0; x < width; x++) {
    pixels[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      pixels[x][y] = color(0,0,0);
    }
  }
  
  return {width, height, pixels};
}

function writePixel(c, x, y, col) {
  c.pixels[x][y] = col;
}

function pixelAt(c, x, y) {
  return c.pixels[x][y];
}

function canvasToPpm(c) {
  return `P3
${c.width} ${c.height}
255`;
}

function clamp(value) {
  return (value < 0 ? 0 : (value > 1 ? 1 : value));
}

function canvasToImageData(c) {
  let data = new Array(c.width * c.height * 4);
  let i = 0;
  
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      let pixel = pixelAt(c, x, y);
      data[i++] = clamp(pixel.red) * 255;
      data[i++] = clamp(pixel.green) * 255;
      data[i++] = clamp(pixel.blue) * 255;
      data[i++] = 255;
    }
  }
  
  return data;
}

module.exports = { canvas, writePixel, pixelAt, canvasToPpm, canvasToImageData };