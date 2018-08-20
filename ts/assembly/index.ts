// The entry file of your WebAssembly module.

function fibonacci(n: i32, a: i32, b: i32): i32 {
  if (n <= 2) {
    return b;
  }
  return fibonacci(n - 1, b, a + b);
}

export function fibts(n: i32): i32 {
  return fibonacci(n, 1, 1);
}