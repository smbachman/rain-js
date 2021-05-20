describe('lights', () => {
  
  const { color, point, pointLight } = Rain;
  
  it('A point light has a position and intensity', () => {
    const intensity = color(1, 1, 1);
    const position = point(0, 0, 0);
    const light = pointLight(position, intensity);
    chai.expect(light.position).to.deep.equal(position);
    chai.expect(light.intensity).to.deep.equal(intensity);
  });

});