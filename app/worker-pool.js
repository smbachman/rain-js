(function (Rain) {
  
  function createPool(threads, messageHandler) {
    const pool = [];
  
    for (let i = 0; i < threads; i++) {
      pool.push(new Worker('/Local/rain/app/rain-worker.js'));
      pool[i].onmessage = messageHandler;
    }
  
    pool.threads = threads;
    pool.nextThread = 0;
  
    return pool;
  }
  
  function postMessage(pool, msg) {
    var worker = pool[(pool.nextThread++) % pool.threads];
    worker.postMessage(msg);
  }
  
  function postRain(pool, method, ...args) {
    postMessage(pool, { method, args });
  }
  
  Rain.workerPool = createPool;
  Rain.postPoolMessage = postMessage;
  Rain.postRain = postRain;

})(Rain);