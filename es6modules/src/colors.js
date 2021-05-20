import * as T from './tuples.js';

export function defineColorProperties(c) {
  Object.defineProperties(c, {
    red: { get: function() { return this[0]; } },
    green: { get: function() { return this[1]; } },
    blue: { get: function() { return this[2]; } },
    alpha: { get: function() { return this[3]; } }
  });
}

export function color(red, green, blue, alpha) {
  let c = [ red, green, blue, (!alpha || alpha > 1) ? 1 : alpha ];
  defineColorProperties(c);
  return c;
}

export function add(a, b) {
  return color(...T.add(a, b));
}

export function subtract(a, b) {
  return color(...T.subtract(a, b));
}

export function multiply(c, s) {
  return color(...T.multiply(c, s));
}

export function hadamardProduct(a, b) {
  return color(a.red * b.red, a.green * b.green, a.blue * b.blue);
}
