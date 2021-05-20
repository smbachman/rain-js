import "https://unpkg.com/json-fn@1.1.1/jsonfn.js";

export function createPool(threads, messageHandler, globals) {
  const pool = [];

  for (let i = 0; i < threads; i++) {
    pool.push(new Worker('/Local/rain/workers/fworker.js'));
    pool[i].onmessage = messageHandler;
    pool[i].postMessage(JSONfn.stringify({ globals }));
  }

  pool.threads = threads;
  pool.nextThread = 0;

  return pool;
}

export function postMessage(pool, e) {
  var worker = pool[(pool.nextThread++) % pool.threads];
  //var worker = pool[Math.floor(Math.random() * pool.threads)];
  worker.postMessage(JSONfn.stringify(e));
}

export function postFunction(pool, fn) {  
  postMessage(pool, { run: fn });
}