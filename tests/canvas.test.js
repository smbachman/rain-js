describe('canvas', function () {
  
  const { canvas, writePixel, pixelAt, canvasToPpm, canvasToImageData, color, equalFloats } = Rain;
  
  it('Creating a canvas', function() {
    let c = canvas(10, 20);
    chai.expect(c.width).to.equal(10);
    chai.expect(c.height).to.equal(20);
    chai.expect(c.pixels
      .every(row => row
        .every(p => p.red === 0 && p.green === 0 && p.blue === 0))).to.be.true;
    chai.expect(c.pixels.length).to.equal(10);
    chai.expect(c.pixels.every(row => row.length === 20)).to.be.true;
  });
  
  it('Writing pixels to a canvas', function() {
    let c = canvas(10, 20);
    let red = color(1, 0, 0);
    writePixel(c, 2, 3, red);
    chai.expect(pixelAt(c, 2, 3)).to.deep.equal(red);
  });
  
  it('Constructing the PPM header', function() {
    let c = canvas(5, 3);
    let ppm = canvasToPpm(c);
    chai.expect(ppm).to.equal(`P3
5 3
255`);
  });
  
  it('Creating the ImageData clamped array', function() {
    let c = canvas(5, 3);
    let c1 = color(1.5, 0, 0);
    let c2 = color(0, 0.5, 0);
    let c3 = color(-0.5, 0, 1);
    writePixel(c, 0, 0, c1);
    writePixel(c, 2, 1, c2);
    writePixel(c, 4, 2, c3);
    let imageData = canvasToImageData(c);
    chai.expect(imageData.data[0]).to.equal(255);
    chai.expect(imageData.data[29]).to.equal(128);
    chai.expect(imageData.data[56]).to.equal(0);
    chai.expect(imageData.data[58]).to.equal(255);
  });
});