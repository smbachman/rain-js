describe('abstract shapes', () => {
  
  const { testShape, setTransform, identity, translation, scaling, material, ray, point, vector, intersect, normalAt, equalTuples, multiplyMatrices, rotationZ } = Rain;
  
  it('the default transformation', () => {
    const s = testShape();
    chai.expect(s.transform).to.deep.equal(identity);
  });
  
  it('assigning a transformation', () => {
    const s = testShape();
    setTransform(s, translation(2, 3, 4));
    chai.expect(s.transform).to.deep.equal(translation(2, 3, 4));
  });
  
  it('the default material', () => {
    const s = testShape();
    chai.expect(s.material).to.deep.equal(material());
  });

  it('assigning a material', () => {
    const s = testShape();
    const m = material();
    m.ambient = 1;
    s.material = m;
    chai.expect(s.material).to.deep.equal(m);
  });
  
  it('intersecting a scaled shape with a ray', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = testShape();
    setTransform(s, scaling(2, 2, 2));
    const xs = intersect(s, r);
    chai.expect(s.savedRay.origin).to.deep.equal(point(0, 0, -2.5));
    chai.expect(s.savedRay.direction).to.deep.equal(vector(0, 0, 0.5));
  });
  
  it('intersecting a translated shape with a ray', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = testShape();
    setTransform(s, translation(5, 0, 0));
    const xs = intersect(s, r);
    chai.expect(s.savedRay.origin).to.deep.equal(point(-5, 0, -5));
    chai.expect(s.savedRay.direction).to.deep.equal(vector(0, 0, 1));
  });

  it('computing the normal on a translated shape', () => {
    const s = testShape();
    setTransform(s, translation(0, 1, 0));
    const n = normalAt(s, point(0, 1.70711, -0.70711));
    chai.expect(equalTuples(n, vector(0, 0.70711, -0.70711))).to.be.true;
  });

  it('computing the normal on a transformed shape', () => {
    const s = testShape();
    setTransform(s, multiplyMatrices(scaling(1, 0.5, 1), rotationZ(Math.PI / 5)));
    const n = normalAt(s, point(0, Math.sqrt(2)/2, -Math.sqrt(2)/2));
    chai.expect(equalTuples(n, vector(0, 0.97014, -0.24254))).to.be.true;
  });
  
// Scenario: Computing the normal on a transformed shape
//   Given s ← test_shape()
//     And m ← scaling(1, 0.5, 1) * rotation_z(π/5)
//   When set_transform(s, m)
//     And n ← normal_at(s, point(0, √2/2, -√2/2))
//     Then n = vector(0, 0.97014, -0.24254)
  
});