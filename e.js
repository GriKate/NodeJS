import fs from 'fs';
import zlib from 'zlib';

let readableStream = fs.createReadStream(
  'hello.txt',
  'utf8'
)

let writeableStream = fs.createWriteStream('hello.txt.gz')

let gzip = zlib.createGzip()

readableStream.pipe(gzip).pipe(writeableStream)