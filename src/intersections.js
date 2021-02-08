function intersection(t, object) {
  return { t, object };
}

function intersections(...args) {
  return args;
}

function hit(xs) {
  return [...xs].sort((a, b) => a.t - b.t).find(i => i.t > 0);
}

module.exports = { intersection, intersections, hit };