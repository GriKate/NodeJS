import fs from 'fs';
import zlib from 'zlib';
import * as readline from 'node:readline';

let readableStream = fs.createReadStream(
  'log.txt',
  'utf8'
)

let writeableStream = fs.createWriteStream('hello.txt.gz')

// let gzip = zlib.createGzip()
const rl = readline.createInterface({ input: readableStream, output: writeableStream });
rl.on('line', (line) => {console.log(line)});

readableStream.pipe(rl)
// .pipe(writeableStream)