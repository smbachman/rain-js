import {equal, multiply} from '../src/matrices.js';

describe('matrices', function () {
  
  it('Constructing and inspecting a 4x4 matrix', function() {
    let m = [
        [1,2,3,4],
        [5.5,6.5,7.5,8.5],
        [9,10,11,12],
        [13.5,14.5,15.5,16.5]
      ];
    chai.expect(m[0][0]).to.equal(1);
    chai.expect(m[0][3]).to.equal(4);
    chai.expect(m[1][0]).to.equal(5.5);
    chai.expect(m[1][2]).to.equal(7.5);
    chai.expect(m[2][2]).to.equal(11);
    chai.expect(m[3][0]).to.equal(13.5);
    chai.expect(m[3][2]).to.equal(15.5);
  });
  
  it('A 2x2 matrix ought to be representable', function() {
    let m = [
      [-3,5],
      [1,-2]
    ];
    
    chai.expect(m[0][0]).to.equal(-3);
    chai.expect(m[0][1]).to.equal(5);
    chai.expect(m[1][0]).to.equal(1);
    chai.expect(m[1][1]).to.equal(-2);
  });
  
  it('A 3x3 matrix ought to be representable', function() {
    let m = [
      [-3, 5, 0],
      [1, -2, -7],
      [0, 1, 1]
    ];
    
    chai.expect(m[0][0]).to.equal(-3);
    chai.expect(m[1][1]).to.equal(-2);
    chai.expect(m[2][2]).to.equal(1);
  });
  
  it('matrix equality with identical matrices', function() {
    let a = [
      [1,2,3,4],
      [5,6,7,8],
      [9,8,7,6],
      [5,4,3,2]
    ];
    
    let b = [
      [1,2,3,4],
      [5,6,7,8],
      [9,8,7,6],
      [5,4,3,2]
    ];
    
    chai.expect(equal(a,b)).to.be.true;
  });
  
  it('matrix equality with different matrices', function() {
    let a = [
      [1,2,3,4],
      [5,6,7,8],
      [9,8,7,6],
      [5,4,3,2]
    ];
    
    let b = [
      [0,2,3,4],
      [5,6,7,8],
      [9,8,7,6],
      [5,4,3,2]
    ];
    
    chai.expect(equal(a,b)).to.be.false;
  });
  
});