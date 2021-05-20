describe('rain', () => {
  
  it('float equality', () => {
    chai.expect(Rain.equalFloats(0.0000008, 0.000009)).to.be.true;
    chai.expect(Rain.equalFloats(0.001, 0.002)).to.be.false;
  });
  
});