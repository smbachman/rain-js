describe('materials', () => {
  
  const {equalFloats, color, material, lighting, pointLight} = Rain;
  
  it('The default material', () => {
    const m = material();
    chai.expect(m.color).to.deep.equal(color(1, 1, 1));
    chai.expect(m.ambient).to.equal(0.1);
    chai.expect(m.diffuse).to.equal(0.9);
    chai.expect(m.specular).to.equal(0.9);
    chai.expect(m.shininess).to.equal(200);
  });
  
  const m = material();
  const position = Rain.point(0, 0, 0);
  
  it('Lighting with the eye between the light and the surface', () => {
    const eyev = Rain.vector(0, 0, -1);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 0, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    chai.expect(result).to.deep.equal(color(1.9, 1.9, 1.9));
  });
  
  it('Lighting with the eye between light and surface, eye offset 45 degrees', () => {
    const eyev = Rain.vector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 0, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    chai.expect(result).to.deep.equal(color(1.0, 1.0, 1.0));
  });
  
  it('Lighting with the eye opposite surface, light offset 45 degrees', () => {
    const eyev = Rain.vector(0, 0, -1);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 10, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    chai.expect(equalFloats(result.red, 0.7364)).to.be.true
    chai.expect(equalFloats(result.green, 0.7364)).to.be.true
    chai.expect(equalFloats(result.blue, 0.7364)).to.be.true
  });

  it('Lighting with eye in the path of the reflection vector', () => {
    const eyev = Rain.vector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 10, -10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    chai.expect(equalFloats(result.red, 1.6364)).to.be.true
    chai.expect(equalFloats(result.green, 1.6364)).to.be.true
    chai.expect(equalFloats(result.blue, 1.6364)).to.be.true
  });
  
  it('Lighting with the light behind the surface', () => {
    const eyev = Rain.vector(0, 0, -1);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 0, 10), color(1, 1, 1));
    const result = lighting(m, light, position, eyev, normalv);
    chai.expect(equalFloats(result.red, 0.1)).to.be.true
    chai.expect(equalFloats(result.green, 0.1)).to.be.true
    chai.expect(equalFloats(result.blue, 0.1)).to.be.true
  });
  
  it('Lighting with the surface in shadow', () => {
    const eyev = Rain.vector(0, 0, -1);
    const normalv = Rain.vector(0, 0, -1);
    const light = pointLight(Rain.point(0, 0, -10), color(1, 1, 1));
    const inShadow = true;
    const result = lighting(m, light, position, eyev, normalv, inShadow);
    chai.expect(result).to.deep.equal(color(0.1, 0.1, 0.1));
  });
  
});