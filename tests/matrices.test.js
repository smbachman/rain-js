describe('matrices', function () {
  
  const { tuple, matrix, equalMatrices, multiplyMatrices, multiplyMatrixTuple, identity, transpose, 
    determinant, submatrix, minor, cofactor, isInvertible, inverse } = Rain;
  
  it('Constructing and inspecting a 4x4 matrix', function() {
    let m = matrix(4,
      1, 2, 3, 4,
      5.5, 6.5, 7.5, 8.5,
      9, 10, 11, 12,
      13.5, 14.5, 15.5, 16.5
    );
    chai.expect(m[0][0]).to.equal(1);
    chai.expect(m[0][3]).to.equal(4);
    chai.expect(m[1][0]).to.equal(5.5);
    chai.expect(m[1][2]).to.equal(7.5);
    chai.expect(m[2][2]).to.equal(11);
    chai.expect(m[3][0]).to.equal(13.5);
    chai.expect(m[3][2]).to.equal(15.5);
  });
  
  it('A 2x2 matrix ought to be representable', function() {
    let m = matrix(2,
      -3, 5,
      1, -2
    );
    
    chai.expect(m[0][0]).to.equal(-3);
    chai.expect(m[0][1]).to.equal(5);
    chai.expect(m[1][0]).to.equal(1);
    chai.expect(m[1][1]).to.equal(-2);
  });
  
  it('A 3x3 matrix ought to be representable', function() {
    let m = matrix(3,
      -3, 5, 0,
      1, -2, -7,
      0, 1, 1
    );
    
    chai.expect(m[0][0]).to.equal(-3);
    chai.expect(m[1][1]).to.equal(-2);
    chai.expect(m[2][2]).to.equal(1);
  });
  
  it('matrix equality with identical matrices', function() {
    let a = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    chai.expect(equalMatrices(a,b)).to.be.true;
  });
  
  it('matrix equality with different matrices', function() {
    let a = matrix(4,
      1,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    let b = matrix(4,
      0,2,3,4,
      5,6,7,8,
      9,8,7,6,
      5,4,3,2
    );
    
    chai.expect(equalMatrices(a,b)).to.not.be.true;
  });
  
  it('Multiplying two matrices', function() {
    let a = matrix(4,
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2);
      
    let b = matrix(4,
      -2, 1, 2, 3,
      3, 2, 1, -1,
      4, 3, 6, 5,
      1, 2, 7, 8);
      
    let result = matrix(4,
      20, 22, 50, 48,
      44, 54, 114, 108,
      40, 58, 110, 102,
      16, 26, 46, 42
    );
      
    chai.expect(equalMatrices(multiplyMatrices(a, b), result)).to.be.true;
  });
  
  it('a matrix multiplied by a tuple', () => {
    let a = matrix(4,
      1, 2, 3, 4,
      2, 4, 4, 2,
      8, 6, 4, 1,
      0, 0, 0, 1);
      
    let b = tuple(1, 2, 3, 1);
    
    let result = multiplyMatrixTuple(a, b);
    
    chai.expect(result).to.deep.equal(tuple(18, 24, 33, 1));
  });
  
  it('multiplying a matrix by the identity matrix', () => {
    let m = matrix(4,
      0, 1, 2, 4,
      1, 2, 4, 8,
      2, 4, 8, 16,
      4, 8, 16, 32);
      
    chai.expect(multiplyMatrices(m, identity)).to.deep.equal(m);
  });
  
  
  it('multiplying a tuple by the identity matrix', () => {
    let p = tuple(1, 2, 3, 4);
      
    chai.expect(multiplyMatrixTuple(identity, p)).to.deep.equal(p);
  });
  
  it('transposing a matrix', () => {
    let m = matrix(4,
      0, 9, 3, 0,
      9, 8, 0, 8,
      1, 8, 5, 3,
      0, 0, 5, 8);
      
    let expected = matrix(4,
      0, 9, 1, 0,
      9, 8, 8, 0,
      3, 0, 5, 5,
      0, 8, 3, 8);
      
    chai.expect(transpose(m)).to.deep.equal(expected);
  });
  
  it('transposing the identity matrix', () => {
    chai.expect(transpose(identity)).to.deep.equal(identity);
  });
  
  it('calculating the determinant of a 2x2 matrix', () =>{
    let a = matrix(2,
      1, 5,
      -3, 2);
      
    chai.expect(determinant(a)).to.equal(17);
  });
  
  it('a submatrix of a 3x3 matrix is a 2x2 matrix', () =>{
    let a = matrix(3,
      1, 5, 0,
      -3, 2, 7,
      0, 6, -3);
      
    let expected = matrix(2, -3, 2, 0, 6);
    
    chai.expect(submatrix(a, 0, 2)).to.deep.equal(expected);
  });
  
  it('a submatrix of a 4x4 matrix is a 3x3 matrix', () =>{
    let a = matrix(4,
      -6, 1, 1, 6,
      -8, 5, 8, 6,
      -1, 0, 8, 2,
      -7, 1, -1, 1);
      
    let expected = matrix(3,
      -6, 1, 6,
      -8, 8, 6,
      -7, -1, 1);
    
    chai.expect(submatrix(a, 2, 1)).to.deep.equal(expected);
  });
  
  it('calculating the minor of a 3x3 matrix', () =>{
    let a = matrix(3,
      3, 5, 0,
      2, -1, 7,
      6, 1, 5);
    
    chai.expect(determinant(submatrix(a, 1, 0))).to.deep.equal(25);
    chai.expect(minor(a, 1, 0)).to.equal(25);
  });
  
  it('calculating a cofactor of a 3x3 matrix', () =>{
    let a = matrix(3,
      3, 5, 0,
      2, -1, -7,
      6, -1, 5);
      
    chai.expect(minor(a, 0, 0)).to.equal(-12);
    chai.expect(cofactor(a, 0, 0)).to.equal(-12);
    chai.expect(minor(a, 1, 0)).to.equal(25);
    chai.expect(cofactor(a, 1, 0)).to.equal(-25);
  });

  it('calculating the determinant of a 3x3 matrix', () =>{
    let a = matrix(3,
      1, 2, 6,
      -5, 8, -4,
      2, 6, 4);

    chai.expect(cofactor(a, 0, 0)).to.equal(56);
    chai.expect(cofactor(a, 0, 1)).to.equal(12);
    chai.expect(cofactor(a, 0, 2)).to.equal(-46);
    chai.expect(determinant(a)).to.equal(-196);
  });

  it('calculating the determinant of a 4x4 matrix', () =>{
    let a = matrix(4,
      -2, -8, 3, 5,
      -3, 1, 7, 3,
      1, 2, -9, 6,
      -6, 7, 7, -9);

    chai.expect(cofactor(a, 0, 0)).to.equal(690);
    chai.expect(cofactor(a, 0, 1)).to.equal(447);
    chai.expect(cofactor(a, 0, 2)).to.equal(210);
    chai.expect(cofactor(a, 0, 3)).to.equal(51);
    chai.expect(determinant(a)).to.equal(-4071);
  });
  
  it('testing an invertible matrix for invertibility', () =>{
    let a = matrix(4,
      6, 4, 4, 4,
      5, 5, 7, 6,
      4, -9, 3, -7,
      9, 1, 7, -6);
      
    chai.expect(determinant(a)).to.equal(-2120);
    chai.expect(isInvertible(a)).to.be.true;
  });
  
  it('testing a noninvertible matrix for invertibility', () =>{
    let a = matrix(4,
      -4, 2, -2, -3,
      9, 6, 2, 6,
      0, -5, 1, -5,
      0, 0, 0, 0 
      );
      
    chai.expect(determinant(a)).to.deep.equal(0);
    chai.expect(isInvertible(a)).to.be.false;
  });
  
  it('testing the inverse of a matrix', () =>{
    let a = matrix(4,
      -5, 2, 6, -8,
      1, -5, 1, 8,
      7, 7, -6, -7,
      1, -3, 7, 4);
      
    let b = inverse(a);
    
    chai.expect(determinant(a)).to.equal(532);
    chai.expect(cofactor(a, 2, 3)).to.equal(-160);
    chai.expect(b[3][2]).to.equal(-160/532);
    chai.expect(cofactor(a, 3, 2)).to.equal(105);
    chai.expect(b[2][3]).to.equal(105/532);
    
    chai.expect(equalMatrices(b, matrix(4,
      0.21805, 0.45113, 0.24060, -0.04511,
      -0.80827, -1.45677, -0.44361, 0.52068,
      -0.07895, -0.22368, -0.05263, 0.19737, 
      -0.52256, -0.81391, -0.30075, 0.30639))).to.be.true;
  });
  
  it('calculating the inverse of another matrix', () =>{
    let m = matrix(4,
      8, -5, 9, 2,
      7, 5, 6, 1,
      -6, 0, 9, 6,
      -3, 0, -9, -4);
    
    chai.expect(equalMatrices(inverse(m), matrix(4,
      -0.15385, -0.15385, -0.28205, -0.53846,
      -0.07692, 0.12308, 0.02564, 0.03077,
      0.35897, 0.35897, 0.43590, 0.92308,
      -0.69231, -0.69231, -0.76923, -1.92308))).to.be.true;
  });

  it('calculating the inverse of a third matrix', () =>{
    let m = matrix(4,
      9, 3, 0, 9,
      -5, -2, -6, -3,
      -4, 9, 6, 4,
      -7, 6, 6, 2);
    
    chai.expect(equalMatrices(inverse(m), matrix(4,
      -0.04074, -0.07778, 0.14444, -0.22222,
      -0.07778, 0.03333, 0.36667, -0.33333,
      -0.02901, -0.14630, -0.10926, 0.12963,
      0.17778, 0.06667, -0.26667, 0.33333))).to.be.true;
  });

  it('multiplying a product by its inverse', () =>{
    let a = matrix(4,
      3,-9,7,3,
      3,-8,2,-9,
      -4,4,4,1,
      -6,5,-1,1);

    let b = matrix(4,
      8,2,2,2,
      3,-1,7,0,
      7,0,5,4,
      6,-2,0,5);

    let c = multiplyMatrices(a, b);

    chai.expect(equalMatrices(multiplyMatrices(c, inverse(b)), a)).to.be.true;
  });

  });