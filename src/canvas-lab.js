import {canvas, writePixel, pixelAt, canvasToImageData} from './canvas.js';
import {color} from './colors.js';

let c = canvas(5, 3);
let c1 = color(1.5, 0, 0);
let c2 = color(0, 0.5, 0);
let c3 = color(-0.5, 0, 1);
writePixel(c, 0, 0, c1);
writePixel(c, 2, 1, c2);
writePixel(c, 4, 2, c3);
let imageData = canvasToImageData(c);

let canvasElement = document.getElementById('image');
let ctx = canvasElement.getContext('2d');

ctx.putImageData(imageData, 0, 0);