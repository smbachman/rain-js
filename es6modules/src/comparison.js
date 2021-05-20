const epsilon = 0.00001

export function floatEqual(a, b) {
  return Math.abs(a - b) < epsilon;
}