describe('transformations', () => {
  
  const {translation, scaling, shearing,
    rotationX, rotationY, rotationZ, viewTransform, 
    equalMatrices, equalTuples, 
    multiplyMatrixTuple: mulMT, multiplyMatrices: mulMM } = Rain;
  
  it('multiplying by a translation matrix', () => {
    let transform = translation(5, -3, 2);
    let p = Rain.point(-3, 4, 5);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(2, 1, 7));
  });
  
  it('Multiplying by the inverse of a translattea matrix', () => {
    let transform = translation(5, -3, 2);
    let inv = Rain.inverse(transform);
    let p = Rain.point(-3, 4, 5);
    chai.expect(mulMT(inv, p)).to.deep.equal(Rain.point(-8, 7, 3));
  });

  it('Translation does not affect vectors', () => {
    let transform = translation (5, -3, 2);
    let v = Rain.vector(-3, 4, 5);
    chai.expect(mulMT(transform, v)).to.deep.equal(v);
  });
  
  it('a scaling matrix applied to a point', () => {
    let transform = scaling(2, 3, 4);
    let p = Rain.point(-4, 6, 8);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(-8, 18, 32));
  });
  
  it('a scaling matrix applied to a vector', () => {
    let transform = scaling(2, 3, 4);
    let p = Rain.vector(-4, 6, 8);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.vector(-8, 18, 32));
  });
  
  it('multiplying by the inverse of a scaling matrix', () => {
    let transform = scaling(2, 3, 4);
    let inv = Rain.inverse(transform);
    let v = Rain.vector(-4, 6, 8);
    chai.expect(mulMT(inv, v)).to.deep.equal(Rain.vector(-2, 2, 2));
  });
  
  it('reflection is scaling by a negative value', () => {
    let transform = scaling(-1, 1, 1);
    let p = Rain.point(2, 3, 4);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(-2, 3, 4));
  });
  
  it('rotating a point around the x axis', () => {
    let p = Rain.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let fullQuarter = rotationX(Math.PI / 2);
    
    chai.expect(equalTuples(mulMT(halfQuarter, p), 
      Rain.point(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2))).to.be.true;
    chai.expect(equalTuples(mulMT(fullQuarter, p), Rain.point(0, 0, 1))).to.be.true;
  });
  
  it('The inverse of an x-rotation rotates in the opposite direction', () => {
    let p = Rain.point(0, 1, 0);
    let halfQuarter = rotationX(Math.PI / 4);
    let inv = Rain.inverse(halfQuarter);
    
    chai.expect(equalTuples(mulMT(inv, p), Rain.point(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))).to.be.true;
  });
  
  it('rotating a point around the y axis', () => {
    let p = Rain.point(0, 0, 1);
    let halfQuarter = rotationY(Math.PI / 4);
    let fullQuarter = rotationY(Math.PI / 2);
    
    chai.expect(equalTuples(mulMT(halfQuarter, p), Rain.point(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2))).to.be.true;
    chai.expect(equalTuples(mulMT(fullQuarter, p), Rain.point(1, 0, 0))).to.be.true;
  });
  
  it('rotating a point around the z axis', () => {
    let p = Rain.point(0, 1, 0);
    let halfQuarter = rotationZ(Math.PI / 4);
    let fullQuarter = rotationZ(Math.PI / 2);
    
    chai.expect(equalTuples(mulMT(halfQuarter, p), Rain.point(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0))).to.be.true;
    chai.expect(equalTuples(mulMT(fullQuarter, p), Rain.point(-1, 0, 0))).to.be.true;
  });
  
  it('A shearing transformation moves x in proportion to y', () => {
    let transform = shearing(1, 0, 0, 0, 0, 0);
    let p = Rain.point(2, 3, 4);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(5, 3, 4));
  });
  
  it('A shearing transformation moves x in proportion to z', () => {
    let transform = shearing(0, 1, 0, 0, 0, 0);
    let p = Rain.point(2, 3, 4);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(6, 3, 4));
  });
  
  it('A shearing transformation moves y in proportion to x', () => {
    let transform = shearing(0, 0, 1, 0, 0, 0);
    let p = Rain.point(2, 3, 4);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(2, 5, 4));
  });
  
  it('A shearing transformation moves y in proportion to z', () => {
    let transform = shearing(0, 0, 0, 1, 0, 0);
    let p = Rain.point(2, 3, 4); 
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(2, 7, 4));
  });
  
  it('A shearing transformation moves z in proportion to x', () => {
    let transform = shearing(0, 0, 0, 0, 1, 0);
    let p = Rain.point(2, 3, 4);
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(2, 3, 6));
  });
  
  it('A shearing transformation moves z in proportion to y', () => {
    let transform = shearing(0, 0, 0, 0, 0, 1);
    let p = Rain.point(2, 3, 4); 
    chai.expect(mulMT(transform, p)).to.deep.equal(Rain.point(2, 3, 7));
  });
  
  it('individual transformations are applied in sequence', () => {
    let p = Rain.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let p2 = mulMT(a, p);
    chai.expect(equalTuples(p2, Rain.point(1, -1, 0))).to.be.true;
    
    let p3 = mulMT(b, p2);
    chai.expect(equalTuples(p3, Rain.point(5, -5, 0))).to.be.true;
    
    let p4 = mulMT(c, p3);
    chai.expect(equalTuples(p4, Rain.point(15, 0, 7))).to.be.true;
  });
  
  it('Chained transformations must be applied in reverse order', () =>{
    let p = Rain.point(1, 0, 1);
    let a = rotationX(Math.PI / 2);
    let b = scaling(5, 5, 5);
    let c = translation(10, 5, 7);
    
    let transform = mulMM(c, mulMM(b, a));
    chai.expect(equalTuples(mulMT(transform, p), Rain.point(15, 0, 7))).to.be.true;
  });
  
  it('The transformation matrix', () => {
    const from = Rain.point(0, 0, 0);
    const to = Rain.point(0, 0, -1);
    const up = Rain.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    chai.expect(vt).to.deep.equal(Rain.identity);
  });
  
  it('A view transformation matrix looking in positive z direction', () => {
    const from = Rain.point(0, 0, 0);
    const to = Rain.point(0, 0, 1);
    const up = Rain.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    chai.expect(vt).to.deep.equal(scaling(-1, 1, -1));
  });

  it('The view transformation moves the world', () => {
    const from = Rain.point(0, 0, 8);
    const to = Rain.point(0, 0, 0);
    const up = Rain.vector(0, 1, 0);
    const vt = viewTransform(from, to, up);
    chai.expect(vt).to.deep.equal(translation(0, 0, -8));
  });
  
  it('An arbitrary view transformation', () => {
    const from = Rain.point(1, 3, 2);
    const to = Rain.point(4, -2, 8);
    const up = Rain.vector(1, 1, 0);
    const vt = viewTransform(from, to, up);
    chai.expect(equalMatrices(vt, Rain.matrix(4, 
      -0.50709, 0.50709, 0.67612, -2.36643,
      0.76772, 0.60609, 0.12122, -2.82843,
      -0.35857, 0.59761, -0.71714, 0.00000,
      0.00000, 0.00000, 0.00000, 1.00000))).to.be.true;
  });
  
});
