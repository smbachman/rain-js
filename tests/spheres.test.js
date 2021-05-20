describe('spheres', () => {
  
  const { sphere, setTransform, point, vector, ray, material, 
    translation, scaling, rotationZ } = Rain;
    
  const intersect = Rain.Shapes.SPHERE.localIntersect;
  const normalAt = Rain.Shapes.SPHERE.localNormalAt;
  
  it('A ray intersects a sphere at two points', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].t).to.equal(4);
    chai.expect(xs[1].t).to.equal(6);
  });
  
  it('A ray intersects a sphere at a tangent', () => {
    const r = ray(point(0, 1, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].t).to.equal(5);
    chai.expect(xs[1].t).to.equal(5);
  });
  
  it('A ray misses a sphere', () => {
    const r = ray(point(0, 2, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    chai.expect(xs.length).to.equal(0);
  });
  
  it('A ray originates inside a sphere', () => {
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].t).to.equal(-1);
    chai.expect(xs[1].t).to.equal(1);
  });
  
  it('A sphere is behind a ray', () => {
    const r = ray(point(0, 0, 5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].t).to.equal(-6);
    chai.expect(xs[1].t).to.equal(-4);
  });
  
  it('Intersect sets the object on the intersection', () => {
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const s = sphere();
    const xs = intersect(s, r);
    chai.expect(xs.length).to.equal(2);
    chai.expect(xs[0].object).to.deep.equal(s);
    chai.expect(xs[1].object).to.deep.equal(s);
  });
  
  it('The normal on a sphere at a point on the x axis', () => {
    const s = sphere();
    const n = normalAt(s, point(1, 0, 0));
    chai.expect(n).to.deep.equal(vector(1, 0, 0));
  });

  it('The normal on a sphere at a point on the y axis', () => {
    const s = sphere();
    const n = normalAt(s, point(0, 1, 0));
    chai.expect(n).to.deep.equal(vector(0, 1, 0));
  });
  
  it('The normal on a sphere at a point on the z axis', () => {
    const s = sphere();
    const n = normalAt(s, point(0, 0, 1));
    chai.expect(n).to.deep.equal(vector(0, 0, 1));
  });
  
  it('The normal on a sphere at a nonaxial point', () => {
    const s = sphere();
    const n = normalAt(s, point(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
    chai.expect(n).to.deep.equal(vector(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3));
  });

});