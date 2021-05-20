(function (Rain) {
  
  const { color } = Rain;
  
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
  
  
  function jimpScan(c) {
    return function(x, y, idx) {
      let pixel = pixelAt(c, x, y);
      this.bitmap.data[idx + 0] = clamp(pixel[0]) * 255;
      this.bitmap.data[idx + 1] = clamp(pixel[1]) * 255;
      this.bitmap.data[idx + 2] = clamp(pixel[2]) * 255;
      this.bitmap.data[idx + 3] = 255; 
    }
  }
  
  function canvasToImageData(c) {
    if (Uint8ClampedArray) {
    let data = new Uint8ClampedArray(c.width * c.height * 4);
    let i = 0;
    let scan = jimpScan(c);
    
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        scan.call({bitmap: { data } }, x, y, i);
        i += 4;
      2}
    }
    
    return new ImageData(data, c.width);
  }
  }

  Rain.canvas = canvas;
  Rain.pixelAt = pixelAt;
  Rain.writePixel = writePixel;
  Rain.canvasToPpm = canvasToPpm;
  Rain.jimpScan = jimpScan;
  Rain.canvasToImageData = canvasToImageData;
  
})(Rain);
