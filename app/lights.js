(function (Rain) {
  
  function pointLight(position, intensity) {
    return { position, intensity };
  };
  
  Rain.pointLight = pointLight;
  
})(Rain);