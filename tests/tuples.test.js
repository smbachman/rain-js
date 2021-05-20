describe('tuples', function () {
  
  const { tuple, point, vector, isPoint, isVector,
    equalTuples, addTuples, subtractTuples, negateTuple, multiplyTuple, divideTuple,
    magnitude, normalize, dot, cross, reflect } = Rain;
  
  it('A tuple with w=1.0 is a point', function () {
    const p = tuple(1,2,3,1);
    chai.expect(isPoint(p)).to.be.true;
    chai.expect(isVector(p)).to.be.false;
  });
  
  it('A tuple with w=0 is a vector', function () {
    const v = tuple(1,2,3,0);
    chai.expect(isPoint(v)).to.be.false;
    chai.expect(isVector(v)).to.be.true;
  });
  
  it('point() creates tuples with w=1', function () {
    chai.expect(point(4, -4, 3)).to.deep.equal(tuple(4, -4, 3, 1));
  });
  
  it('vector() creates tuples with w=0', function () {
    chai.expect(vector(4, -4, 3)).to.deep.equal(tuple(4, -4, 3, 0));
  });
  
  it('Adding two tuples', function () {
    const a = tuple(3, -2, 5, 1);
    const b = tuple(-2, 3, 1, 0);
    chai.expect(addTuples(a, b)).to.deep.equal(tuple(1, 1, 6, 1));
  });
  
  it('Subtracting two points', function () {
    const a = point(3, 2, 1);
    const b = point(5, 6, 7);
    chai.expect(subtractTuples(a, b)).to.deep.equal(vector(-2, -4, -6));
  });
  
  it('Subtracting a point from a vector', function () {
    const p = point(3, 2, 1);
    const v = vector(5, 6, 7);
    chai.expect(subtractTuples(p, v)).to.deep.equal(point(-2, -4, -6));
  });
  
  it('Subtracting a vector from a vector', function () {
    const p = vector(3, 2, 1);
    const v = vector(5, 6, 7);
    chai.expect(subtractTuples(p, v)).to.deep.equal(vector(-2, -4, -6));
  });
  
  it('Subtracting a vector from the zero vector', function () {
    const zero = vector(0, 0, 0);
    const v = vector(1, -2, 3);
    chai.expect(subtractTuples(zero, v)).to.deep.equal(vector(-1, 2, -3));
  });
  
  it('Negating a tuple', function () {
    const p = tuple(1, -2, 3, -4);
    chai.expect(negateTuple(p)).to.deep.equal(tuple(-1, 2, -3, 4));
  });
  
  it('Multiplying a tuple by a scalar', function () {
    const p = tuple(1, -2, 3, -4);
    chai.expect(multiplyTuple(p, 3.5)).to.deep.equal(tuple(3.5, -7, 10.5, -14));
  });
  
  it('Multiplying a tuple by a fraction', function () {
    const p = tuple(1, -2, 3, -4);
    chai.expect(multiplyTuple(p, 0.5)).to.deep.equal(tuple(0.5, -1, 1.5, -2));
  });
  
  it('Dividing a tuple by a scalar', function () {
    const p = tuple(1, -2, 3, -4);
    chai.expect(divideTuple(p, 2)).to.deep.equal(tuple(0.5, -1, 1.5, -2));
  });
  
  it('Computing the magnitude of vector(1, 0, 0)', function () {
    const v = vector(1, 0, 0);
    chai.expect(magnitude(v)).to.equal(1);
  });
  
  it('Computing the magnitude of vector(0, 1, 0)', function () {
    const v = vector(0, 1, 0);
    chai.expect(magnitude(v)).to.equal(1);
  });
  
  it('Computing the magnitude of vector(0, 0, 1)', function () {
    const v = vector(0, 0, 1);
    chai.expect(magnitude(v)).to.equal(1);
  });
  
  it('Computing the magnitude of vector(1, 2, 3)', function () {
    const v = vector(1, 2, 3);
    chai.expect(magnitude(v)).to.equal(Math.sqrt(14));
  });
  
  it('Computing the magnitude of vector(-1, -2, -3)', function () {
    const v = vector(-1, -2, -3);
    chai.expect(magnitude(v)).to.equal(Math.sqrt(14));
  });
  
  it('Normalizing vector(4,0,0) givea vector(1,0,0)', function () {
    const v = vector(4, 0, 0);
    chai.expect(normalize(v)).to.deep.equal(vector(1, 0, 0));
  });
  
  it('Normalizing vector(1, 2, 3)', function () {
    const v = vector(1, 2, 3);
    const r = Math.sqrt(14);
    chai.expect(normalize(v)).to.deep.equal(vector(1/r, 2/r, 3/r));
  });
  
  it('The magnitude of a normalized vector', function () {
    const v = vector(1, 2, 3);
    chai.expect(magnitude(normalize(v))).to.equal(1);
  });
  
  it('The dot product of two tuples', function () {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    chai.expect(dot(a, b)).to.equal(20);
  });
  
  it('The cross product of two vectors', function () {
    const a = vector(1, 2, 3);
    const b = vector(2, 3, 4);
    chai.expect(cross(a, b)).to.deep.equal(vector(-1, 2, -1));
    chai.expect(cross(b, a)).to.deep.equal(vector(1, -2, 1));
  });
  
  it('Reflecting a vector approaching at 45 degrees', () => {
    const v = vector(1, -1, 0);
    const n = vector(0, 1, 0);
    const r = reflect(v, n);
    chai.expect(r).to.deep.equal(vector(1, 1, 0));
  });

  it('Reflecting a vector off a slanted surface', () => {
    const v = vector(0, -1, 0);
    const n = vector(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
    const r = reflect(v, n);
    chai.expect(equalTuples(r, vector(1, 0, 0))).to.be.true;
  });
  
});