(function (Rain) {
  
  function defineColorProperties(c) {
    Object.defineProperties(c, {
      red: { get: function() { return this[0]; } },
      green: { get: function() { return this[1]; } },
      blue: { get: function() { return this[2]; } },
      alpha: { get: function() { return this[3]; } },
      type: { get: () => 'COLOR' }
    });
  }
  
  function color(red, green, blue, alpha) {
    let c = [ red, green, blue, (!alpha || alpha > 1) ? 1 : alpha ];
    defineColorProperties(c);
    return c;
  }
  
  function addColors(a, b) {
    return color(...Rain.addTuples(a, b));
  }
  
  function subtractColors(a, b) {
    return color(...Rain.subtractTuples(a, b));
  }
  
  function multiplyColor(c, s) {
    return color(...Rain.multiplyTuple(c, s));
  }
  
  function hadamardProduct(a, b) {
    return color(a[0] * b[0], a[1] * b[1], a[2] * b[2]);
  }
  
  Rain.color = color;
  
  Rain.addColors = addColors;
  Rain.subtractColors = subtractColors;
  Rain.multiplyColor = multiplyColor;
  Rain.hadamardProduct = hadamardProduct;
  
})(Rain);