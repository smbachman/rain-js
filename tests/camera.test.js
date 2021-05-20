describe('camera', () => {
  
  const { camera, rayForPixel, colorAt, render, identity, equalFloats, subtractTuples, equalTuples, 
    point, vector, rotationY, translation, viewTransform, defaultWorld, pixelAt, multiplyMatrices, color } = Rain;
  
  it('Constructing a camera', () => {
    const hsize = 160;
    const vsize = 120;
    const fieldOfView = Math.PI / 2;
    const c = camera(hsize, vsize, fieldOfView);
    chai.expect(c.hsize).to.equal(hsize);
    chai.expect(c.vsize).to.equal(vsize);
    chai.expect(c.fieldOfView).to.equal(fieldOfView);
    chai.expect(c.transform).to.equal(identity);
  });
  
  it('The pixel size for a horizontal canvas', () => {
    const c = camera(200, 125, Math.PI / 2);
    chai.expect(equalFloats(c.pixelSize, 0.01)).to.be.true;
  });
  
  it('The pixel size for a vertical canvas', () => {
    const c = camera(125, 200, Math.PI / 2);
    chai.expect(equalFloats(c.pixelSize, 0.01)).to.be.true;
  });
  
  it('Constructing a ray through the center of the canvas', () => {
    const c = camera(201, 101, Math.PI / 2);
    const r = rayForPixel(c, 100, 50);
    chai.expect(equalTuples(r.origin, point(0, 0, 0))).to.be.true;
    chai.expect(equalTuples(r.direction, vector(0, 0, -1))).to.be.true;
  });
  
  it('Constructing a ray through a corner of the canvas', () => {
    const c = camera(201, 101, Math.PI / 2);
    const r = rayForPixel(c, 0, 0);
    chai.expect(equalTuples(r.origin, point(0, 0, 0))).to.be.true;
    chai.expect(equalTuples(r.direction, vector(0.66519, 0.33259, -0.66851))).to.be.true;
  });

  it('Constructing a ray when the camera is transformed', () => {
    const c = camera(201, 101, Math.PI / 2);
    c.transform = multiplyMatrices(rotationY(Math.PI / 4), translation(0, -2, 5));
    const r = rayForPixel(c, 100, 50);
    chai.expect(equalTuples(r.origin, point(0, 2, -5))).to.be.true;
    chai.expect(equalTuples(r.direction, vector(Math.sqrt(2) / 2, 0, -Math.sqrt(2) / 2))).to.be.true;
  });
  
  it('Rendering a world with a camera', () => {
    const w = defaultWorld();
    const c = camera(11, 11, Math.PI / 2);
    const from = point(0, 0, -5);
    const to = point(0, 0, 0);
    const up = point(0, 1, 0);
    c.transform = viewTransform(from, to, up);
    const image = render(c, w);
    chai.expect(equalTuples(pixelAt(image, 5, 5), color(0.38066, 0.47583, 0.2855))).to.be.true;
  });
});