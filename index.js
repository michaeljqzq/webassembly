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

loadWebAssembly('counter.wasm', {})
  .then(instance => {
    squarer = instance.exports._Z7squareri;
    console.log('Finished compiling! Ready when you are...');
  });