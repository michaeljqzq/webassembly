let squarer;

function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bits => WebAssembly.compile(bits))
    .then(module => {
      var imports =  {};
      imports.global = imports.global||{NaN:5,Infinity:6};
      imports.env = imports.env || {};
      imports.env.memoryBase = imports.env.memoryBase || 0;
      imports.env.tableBase = imports.env.tableBase || 0;
      if (!imports.env.memory) {
        imports.env.memory = new WebAssembly.Memory({
          initial: 256
        });
      }
      if (!imports.env.table) {
        imports.env.table = new WebAssembly.Table({
          initial: 0,
          element: 'anyfunc'
        });
      }
      return new WebAssembly.Instance(module, imports)
    });
};

function loadJs(fileName) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = resolve;
    script.onerror = reject;
    script.async = true;
    script.src = fileName;
  });
}

Promise.all([loadWebAssembly('./fibo/fibo.wasm', {}), loadWebAssembly('./ts/build/untouched.wasm', {})])
  .then(instances => {
    let exports = {};
    for(let instance of instances) {
      Object.assign(exports, instance.exports);
    }
    console.log('Finished compiling! Ready when you are...');
    window.exports = exports;
    return loadJs('./fibo/comparePerformance.js');
  });