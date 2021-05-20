describe('intersections', () => {
  
  const { sphere, intersection, intersections, hit, prepareComputations, point, vector, ray, equalTuples } = Rain;
  
  it('An intersection encapsulates t and object', () => {
    const s = sphere();
    const i = intersection(3.5, s);
    chai.expect(i.t).to.equal(3.5);
    chai.expect(i.object).to.equal(s);
  });
  
  it('Aggregating intersections', () => {
    const s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);
    const xs = intersections(i1, i2);
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].t).to.equal(1);
    chai.expect(xs[1].t).to.equal(2);
  });
  
  it('The hit, when all intersections have positive t', () => {
    let s = sphere();
    const i1 = intersection(1, s);
    const i2 = intersection(2, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    chai.expect(i).to.deep.equal(i1);
  });

  it('The hit, when some intersections have negative t', () => {
    let s = sphere();
    const i1 = intersection(-1, s);
    const i2 = intersection(1, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    chai.expect(i).to.deep.equal(i2);
  });
  
  it('The hit, when all intersections have negative t', () => {
    let s = sphere();
    const i1 = intersection(-2, s);
    const i2 = intersection(-1, s);
    const xs = intersections(i1, i2);
    const i = hit(xs);
    chai.expect(i).to.be.undefined;
  });
  
  it('The hit is always the lowest nonnegative intersection', () => {
    let s = sphere();
    const i1 = intersection(5, s);
    const i2 = intersection(7, s);
    const i3 = intersection(-3, s);
    const i4 = intersection(2, s);
    const xs = intersections(i1, i2, i3, i4);
    const i = hit(xs);
    chai.expect(i).to.deep.equal(i4);
  });
  
  it('Precomputing the state of an intersection', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(4, shape);
    const comps = prepareComputations(i, r);
    chai.expect(comps.t).to.deep.equal(i.t);
    chai.expect(comps.object).to.deep.equal(i.object);
    chai.expect(equalTuples(comps.point, point(0, 0, -1))).to.be.true;
    chai.expect(equalTuples(comps.eyev, vector(0, 0, -1))).to.be.true;
    chai.expect(equalTuples(comps.normalv, vector(0, 0, -1))).to.be.true;
  });
  
  it('The hit, when an intersection occurs on the outside', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(4, shape);
    const comps = prepareComputations(i, r);
    chai.expect(comps.inside).to.be.false;
  });
  
  it('The hit, when an intersection occurs on the inside', () => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const shape = sphere();
    const i = intersection(1, shape);
    const comps = prepareComputations(i, r);
    chai.expect(equalTuples(comps.point, point(0, 0, 1))).to.be.true;
    chai.expect(equalTuples(comps.eyev, vector(0, 0, -1))).to.be.true;
    chai.expect(equalTuples(comps.normalv, vector(0, 0, -1))).to.be.true;
    chai.expect(comps.inside).to.be.true;
  });

  it('The hit should offset the point', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = sphere();
    shape.transform = Rain.translation(0, 0, 1);
    const i = intersection(5, shape);
    const comps = prepareComputations(i, r);
    chai.expect(comps.overPoint.z).to.be.below(-Rain.epsilon / 2);
    chai.expect(comps.point.z).to.be.above(comps.overPoint.z);
  });
  
});