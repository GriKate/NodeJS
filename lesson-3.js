import fetch from 'node-fetch';
import fs, { rmSync } from 'fs';
import * as readline from 'node:readline';

// (async () => {
//     const res = await fetch('https://docs.google.com/document/d/1uuKKxercOrN4uXx6chCypM7XSXTSRY27Y19KCebfL-s/edit');
//     console.log(res)
// }) ()

// let readableStream = fs.createReadStream(
//     // '../access_tmp.log',
//     'hi.txt',
//     'utf8'
//   );

function search(props) {
    const readableStream = fs.createReadStream(
        // '../access_tmp.log',
        'log.txt',
        'utf8'
    );

    // for await (let ip of props) {
    props.map((ip) => {
        console.log(`IP: ${ip}`);

        const filename = '%' + ip + '%_requests.log';
        const searchStr = ip;
        let strToWrite = '';

        const writeableStream = fs.createWriteStream(filename);
        const rl = readline.createInterface({ input: readableStream, output: writeableStream });

        // function getString() {
        //     rl.on('line', (line) => {
        //         // console.log(searchStr);
        //         if (line.includes(searchStr)) {
        //             // strToWrite = line;
        //             return line;
        //             // console.log(`Received strToWrite: ${strToWrite}`);
        //         }
        //     })
        // }

        // chunk должен быть 1 строкой
        // const readableStream = fs.createReadStream("./myfile", { highWaterMark: 20 });
        readableStream.on('data', function (chunk) {

            rl.on('line', (line) => {
                console.log(searchStr);
                if (line.includes(searchStr)) {
                    strToWrite = line;
                    console.log(`Received strToWrite: ${strToWrite}`);
                    writeableStream.write(strToWrite);
                }
            }).on('close', () => process.exit(0));

            
        });
    })
    // readableStream.pipe(getString).pipe(writeableStream);
}

search(['89.123.1.41', '176.212.24.22']);


// const answer = await rl.question('What do you think of Node.js? ');

// console.log(`Thank you for your valuable feedback: ${answer}`);

// rl.close();


// ________________________________________________________

import fetch from 'node-fetch';
import fs, { rmSync } from 'fs';
import * as readline from 'node:readline';

function search(props) {
    const readableStream = fs.createReadStream(
        // '../access_tmp.log',
        'log.txt',
        'utf8'
    );

    props.map((ip) => {
        console.log(`IP: ${ip}`);

        const filename = '%' + ip + '%_requests.log';
        console.log(`filename: ${filename}`);
        // const searchStr = ip;
        // let strToWrite = '';

        const writeableStream = fs.createWriteStream(filename);
        const rl = readline.createInterface({ input: readableStream, output: writeableStream });
        rl.on('line', (line) => {
            console.log(`Received line: ${line}`);
            return line;
        });

        readableStream.pipe(rl).pipe(writeableStream);

        // const getString = function () {
        //     rl.on('line', (line) => {
        //         // console.log(searchStr);
        //         if (line.includes(searchStr)) {
        //             // strToWrite = line;
        //             console.log(`Received line: ${line}`);
        //             return line;
        //             // console.log(`Received strToWrite: ${strToWrite}`);
        //         }
        //     })
        // }

        // chunk должен быть 1 строкой
        // const readableStream = fs.createReadStream("./myfile", { highWaterMark: 20 });
        // readableStream.on('data', function (chunk) {

        //     rl.on('line', (line) => {
        //         console.log(searchStr);
        //         if (line.includes(searchStr)) {
        //             strToWrite = line;
        //             console.log(`Received strToWrite: ${strToWrite}`);
        //             writeableStream.write(strToWrite);
        //         }
        //     }).on('close', () => process.exit(0));
        // });
    })
}

search(['89.123.1.41', '176.212.24.22']);
