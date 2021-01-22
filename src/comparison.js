const epsilon = 0.00001

function floatEqual(a, b) {
  return Math.abs(a - b) < epsilon;
}

module.exports = { floatEqual };