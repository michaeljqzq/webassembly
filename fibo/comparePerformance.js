function fib(n) {
  if (n <= 2) {
    return 1
  }
  return fib(n - 2) + fib(n - 1)
}

const N = 40;

let start = performance.now();
console.log(fib(N));
let end = performance.now();
console.log(`Javascript: ${(end-start)} ms.`);

start = performance.now();
console.log(exports.fib(N));
end = performance.now();
console.log(`WebAssembly: ${(end-start)} ms.`);

start = performance.now();
console.log(exports.fibts(N));
end = performance.now();
console.log(`AssemblyScript: ${(end-start)} ms.`);