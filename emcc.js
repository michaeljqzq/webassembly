const cp = require('child_process');

let args = (`run --rm -v ${process.cwd()}:/home/src emsdk emcc`).split(" ");

for(let i=2;i<process.argv.length;i++) {
  args.push(process.argv[i]);
}

let sp = cp.spawn("docker", args);
sp.stdout.on('data', function (data) {
  console.log(data.toString());
});

sp.stderr.on('data', function (data) {
  console.log(data.toString());
});

sp.on('exit', function (code) {
  console.log('child process exited with code ' + code.toString());
});

// emcc counter.cpp -s WASM=1 -s SIDE_MODULE=1 -o counter.wasm