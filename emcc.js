const cp = require('child_process');

let args = (`run --rm -v ${__dirname}:/home/src emsdk emcc`).split(" ");

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