let squarer;

function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
};

function loadExternalJS(src) {
  let script = document.createElement('script');
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

const projectName = 'array';
loadWebAssembly(`${projectName}.wasm`, {})
  .then(bytes => {
    SumArray.wasmBinary = bytes;
    sumArray = SumArray({
      wasmBinary: SumArray.wasmBinary
    });

    const nByte = 4;

    let internalSumArray = sumArray.cwrap('sumArray', null, ['number', 'number']);
    window.wrappedSumArray = function(arr) {
      return internalSumArray(arrayToPtr(arr), arr.length);
    }

    // Takes an Int32Array, copies it to the heap and returns a pointer
    function arrayToPtr(array) {
      var ptr = sumArray._malloc(array.length * nByte)
      sumArray.HEAP32.set(array, ptr / nByte)
      return ptr
    }

    // Takes a pointer and  array length, and returns a Int32Array from the heap
    function ptrToArray(ptr, length) {
      var array = new Int32Array(length)
      var pos = ptr / nByte
      array.set(sumArray.HEAP32.subarray(pos, pos + length))
      return array
    }
  });