describe('rays', () => {
  
  const { translation, scaling, ray, position, transform, point, vector } = Rain;
  
  it('Creating and querying a ray', () => {
    const origin = point(1, 2, 3);
    const direction = vector(4, 5, 6);
    const r = ray(origin, direction);
    
    chai.expect(r.origin).to.deep.equal(origin);
    chai.expect(r.direction).to.deep.equal(direction);
  });
  
  it('Computing a point from a distance', () => {
    const r = ray(point(2, 3, 4), vector(1, 0, 0));
    
    chai.expect(position(r, 0)).to.deep.equal(point(2, 3, 4));
    chai.expect(position(r, 1)).to.deep.equal(point(3, 3, 4));
    chai.expect(position(r, -1)).to.deep.equal(point(1, 3, 4));
    chai.expect(position(r, 2.5)).to.deep.equal(point(4.5, 3, 4));
  });
  
  it('Translating a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = translation(3, 4, 5);
    const r2 = transform(r, m);
    
    chai.expect(r2.origin).to.deep.equal(point(4, 6, 8));
    chai.expect(r2.direction).to.deep.equal(vector(0, 1, 0));
  });
  
  it('Scaling a ray', () => {
    const r = ray(point(1, 2, 3), vector(0, 1, 0));
    const m = scaling(2, 3, 4);
    const r2 = transform(r, m);
    
    chai.expect(r2.origin).to.deep.equal(point(2, 6, 12));
    chai.expect(r2.direction).to.deep.equal(vector(0, 3, 0));
  });
  
});