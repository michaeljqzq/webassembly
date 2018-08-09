let squarer;

function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bits => {
      // 1 equals to 64KB
      const memory = new WebAssembly.Memory({
        initial: 1,
        maximum: 1
      });
      const importObj = {
        global: {
          NaN: 123,
          Infinity: 123,
        },
        env: {
          abortStackOverflow: () => {
            throw new Error('overflow');
          },
          table: new WebAssembly.Table({
            initial: 0,
            maximum: 0,
            element: 'anyfunc'
          }),
          tableBase: 0,
          memory: memory,
          memoryBase: 1024,
          STACKTOP: 0,
          STACK_MAX: memory.buffer.byteLength,
          DYNAMICTOP_PTR: 0,
          tempDoublePtr: 0,
          ABORT: 0,
          nullFunc_X: ()=>123,
          _printf:()=>123,
        }
      };
      // imports.env.value = {
      //   mj: 1
      // }
      window.wamemory = importObj.env.memory;
      return WebAssembly.instantiate(bits, importObj)
    });
};

function loadExternalJS(src) {
  let script = document.createElement('script');
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

const projectName = 'memory';
loadWebAssembly(`${projectName}/${projectName}.wasm`, {})
  .then(results => {
    let instance = results.instance;
    console.log('Finished compiling! Ready when you are...');
    window.exports = instance.exports;
    window.wainstance = instance;
    window.wamodule = results.module;
    // loadExternalJS(`${projectName}/comparePerformance.js`);
  });