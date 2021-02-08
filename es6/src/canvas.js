import {color} from './colors.js';

export function canvas(width,height) {
  let pixels = new Array(width);
  
  for (let x = 0; x < width; x++) {
    pixels[x] = new Array(height);
    for (let y = 0; y < height; y++) {
      pixels[x][y] = color(0,0,0);
    }
  }
  
  return {width, height, pixels};
}

export function writePixel(c, x, y, col) {
  c.pixels[x][y] = col;
}

export function pixelAt(c, x, y) {
  return c.pixels[x][y];
}

export function canvasToPpm(c) {
  return `P3
${c.width} ${c.height}
255`;
}

function clamp(value) {
  return (value < 0 ? 0 : (value > 1 ? 1 : value));
}


export function jimpScan(c) {
  return function(x, y, idx) {
    let pixel = pixelAt(c, x, y);
    this.bitmap.data[idx + 0] = clamp(pixel.red) * 255;
    this.bitmap.data[idx + 1] = clamp(pixel.green) * 255;
    this.bitmap.data[idx + 2] = clamp(pixel.blue) * 255;
    this.bitmap.data[idx + 3] = 255; 
  }
}

export function canvasToImageData(c) {
  let data = new Array(c.width * c.height * 4);
  let i = 0;
  let scan = jimpScan(c);
  
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      scan.call({bitmap: { data } }, x, y, i);
      i += 4;
    }
  }
  
  return data;
}
