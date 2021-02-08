export function intersection(t, object) {
  return { t, object };
}

export function intersections(...args) {
  return args;
}

export function hit(xs) {
  return [...xs].sort((a, b) => a.t - b.t).find(i => i.t > 0);
}
