const Rain = { Shapes: {} };

(function (Rain) {
  
  const epsilon = 0.00001;

  function equalFloats(a, b) {
    return Math.abs(a - b) < epsilon;
  };
  
  function pollute(global) {
    for (let p in Rain) {
      global[p] = Rain[p];
    }
  }
  
  Rain.equalFloats = equalFloats;
  Rain.pollute = pollute;
  Rain.epsilon = epsilon;
  
})(Rain);
