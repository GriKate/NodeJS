import fs from 'fs';
import * as readline from 'node:readline';
import { pipeline } from 'stream';

function search(props) {
    const readableStream = fs.createReadStream(
        // '../access_tmp.log',
        'log.txt',
        'utf8'
    );

    props.map((ip) => {
        const filename = '%' + ip + '%_requests.log';
        const searchStr = ip;

        const writeableStream = fs.createWriteStream(filename);

        // function check() {
            const rl = readline.createInterface({ input: readableStream, output: writeableStream });

            rl.on('line', (line) => {
                if (line.includes(searchStr)) {
                    console.log(`Received line: ${line}`);;
                    writeableStream.write(line);
                }
            });
        // }
        // readableStream.pipe(rl);
        // readableStream.pipe(check).pipe(writeableStream);
        pipeline(readableStream, rl, writeableStream, (err) => {
            err && console.error(err);
        });
    })
}

search(['89.123.1.41', '176.212.24.22']);