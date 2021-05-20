describe('world', () => {
  
  const { equalTuples, pointLight, sphere, setTransform, point, vector, color, scaling, world, defaultWorld, intersectWorld, shadeHit, colorAt, ray, intersection, prepareComputations, isShadowed } = Rain;
  
  it('Creating a world', () => {
    const w = world();
    chai.expect(w.light).to.be.undefined;
    chai.expect(w.objects).to.be.undefined;
  });
  
  it('The default world', () => {
    const light = pointLight(point(-10, 10, -10), color(1, 1, 1));
    
    const s1 = sphere();
    s1.material.color = color(0.8, 1, 0.6);
    s1.material.diffuse = 0.7;
    s1.material.specular = 0.2;
    
    const s2 = sphere();
    setTransform(s2, scaling(0.5, 0.5, 0.5));
    
    const w = defaultWorld();
    
    chai.expect(w.light).to.deep.equal(light);
    chai.expect(w.objects[0]).to.deep.equal(s1);
    chai.expect(w.objects[1]).to.deep.equal(s2);
  });
  
  it('Intersect a world with a ray', () => {
    const w = defaultWorld();
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const xs = intersectWorld(w, r);
    chai.expect(xs.length).to.equal(4);
    chai.expect(xs[0].t).to.equal(4);
    chai.expect(xs[1].t).to.equal(4.5);
    chai.expect(xs[2].t).to.equal(5.5);
    chai.expect(xs[3].t).to.equal(6);
  });
  
  it('Shading an intersection', () => {
    const w = defaultWorld();
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const shape = w.objects[0];
    const i = intersection(4, shape);
    const comps = prepareComputations(i, r);
    const c = shadeHit(w, comps);
    chai.expect(equalTuples(c, color(0.38066, 0.47583, 0.2855))).to.be.true;
  });

  it('Shading an intersection from the inside', () => {
    const w = defaultWorld();
    w.light = pointLight(point(0, 0.25, 0), color(1, 1, 1));
    const r = ray(point(0, 0, 0), vector(0, 0, 1));
    const shape = w.objects[1];
    const i = intersection(0.5, shape);
    const comps = prepareComputations(i, r);
    const c = shadeHit(w, comps);
    chai.expect(equalTuples(c, color(0.90498, 0.90498, 0.90498))).to.be.true;
  });
  
  it('The color when a ray misses', () => {
    const w = defaultWorld();
    const r = ray(point(0, 0, -5), vector(0, 1, 0));
    const c = colorAt(w, r);
    chai.expect(c).to.deep.equal(color(0, 0, 0));
  });

  it('The color when a ray hits', () => {
    const w = defaultWorld();
    const r = ray(point(0, 0, -5), vector(0, 0, 1));
    const c = colorAt(w, r);
    chai.expect(equalTuples(c, color(0.38066, 0.47583, 0.2855))).to.be.true;
  });

  it('The color with an intersection behind the ray', () => {
    const w = defaultWorld();
    const outer = w.objects[0];
    outer.material.ambient = 1;
    const inner = w.objects[1];
    inner.material.ambient = 1;
    const r = ray(point(0, 0, 0.75), vector(0, 0, -1));
    const c = colorAt(w, r);
    chai.expect(equalTuples(c, inner.material.color)).to.be.true; 
  });
  
  it('There is no shadow when nothing is collinear with point and light', () => {
    const w = defaultWorld();
    const p = point(0, 10, 0);
    chai.expect(isShadowed(w, p)).to.be.false;
  });

  it('The shadow when an object is between the point and the light', () => {
    const w = defaultWorld();
    const p = point(10, -10, 10);
    chai.expect(isShadowed(w, p)).to.be.true;
  });
  
  it('There is no shadow when an object is behind the light', () => {
    const w = defaultWorld();
    const p = point(-20, 20, -20);
    chai.expect(isShadowed(w, p)).to.be.false;
  });
  
  it('There is no shadow when an object is behind the point', () => {
    const w = defaultWorld();
    const p = point(-2, 2, -2);
    chai.expect(isShadowed(w, p)).to.be.false;
  });
  
});