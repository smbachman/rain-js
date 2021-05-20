describe('planes', () => {
  
  const { plane, point, vector, ray } = Rain;
  
  const { localNormalAt, localIntersect } = Rain.Shapes.PLANE;
  
  it('the normal of a plane is a constant everywhere', () => {
    const p = plane();
    const n1 = localNormalAt(p, point(0, 0, 0));
    const n2 = localNormalAt(p, point(10, 0, -10));
    const n3 = localNormalAt(p, point(-5, 0, 150));
    
    chai.expect(n1).to.deep.equal(vector(0, 1, 0));
    chai.expect(n2).to.deep.equal(vector(0, 1, 0));
    chai.expect(n3).to.deep.equal(vector(0, 1, 0));
  });
  
  it('intersect with a ray parallel to the plane', () => {
    const p = plane();
    const r = ray(point(0, 10, 0), vector(0, 0, 1));
    const xs = localIntersect(p, r);
    chai.expect(xs).to.be.empty;
  });
  
  it('intersect with a coplanar ray', () => {
    const p = plane();
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const xs = localIntersect(p, r);
    chai.expect(xs).to.be.empty;
  });
  
  it('a ray intersecting a plane from above', () => {
    const p = plane();
    const r = ray(point(0, 1, 0), vector(0, -1, 0));
    const xs = localIntersect(p, r);
    chai.expect(xs.length).to.equal(1);
    chai.expect(xs[0].t).to.equal(1);
    chai.expect(xs[0].object).to.equal(p);
  });
  
  it('a ray intersecting a plane from below', () => {
    const p = plane();
    const r = ray(point(0, -1, 0), vector(0, 1, 0));
    const xs = localIntersect(p, r);
    chai.expect(xs.length).to.equal(1);
    chai.expect(xs[0].t).to.equal(1);
    chai.expect(xs[0].object).to.equal(p);
  });
  
});