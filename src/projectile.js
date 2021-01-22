const {add} = require("./tuples.js");

function projectile(position, velocity) {
  return { position, velocity };
}

function environment(gravity, wind) {
  return { gravity, wind };
}

function tick(env, proj) {
  let position = add(proj.position, proj.velocity);
  let velocity = add(add(proj.velocity, env.gravity), env.wind);
  return projectile(position, velocity);
}

module.exports = { projectile, environment, tick }