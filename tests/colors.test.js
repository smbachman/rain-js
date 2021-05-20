describe('colors', function () {
  
  const { color, addColors, subtractColors, multiplyColor, hadamardProduct } = Rain;
  const equalColors = Rain.equalTuples;
  
  it('colors are (red, green, blue) tuples', function () {
    let c = color(-0.5, 0.4, 1.7);
    chai.expect(c.red, -0.5);
    chai.expect(c.green, 0.4);
    chai.expect(c.blue, 1.7);
  });
  
  it('Adding colors', function () {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);    
    chai.expect(addColors(a, b)).to.deep.equal(color(1.6, 0.7, 1.0));
  });
  
  it('Subtracting colors', function () {
    const a = color(0.9, 0.6, 0.75);
    const b = color(0.7, 0.1, 0.25);
    const r = subtractColors(a, b);
    chai.expect(equalColors(r, color(0.2, 0.5, 0.5))).to.be.true;
  });
  
  it('Multiplying a color by a scalar', function () {
    const c = color(0.2, 0.3, 0.4);
    chai.expect(multiplyColor(c, 2)).to.deep.equal(color(0.4, 0.6, 0.8));
  });
  
  it('Multiplying colors', function () {
    const a = color(1, 0.2, 0.4);
    const b = color(0.9, 1, 0.1);
    const r = hadamardProduct(a, b);
    chai.expect(equalColors(r, color(0.9, 0.2, 0.04))).to.be.true;
  });
  
});