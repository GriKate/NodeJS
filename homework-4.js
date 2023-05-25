import readline from 'readline';
import inquirer from "inquirer";
import fsp from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { stdout } from 'process';
import { stat } from 'node:fs';
import { stdin as input, stdout as output } from 'node:process';

function showFile(dirname) {
    fsp
        .readdir(path.join(dirname)) // вернет список файлов в __dirname
        .then((choices) => {
            return inquirer
            .prompt([{
                name: "fileName",
                type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
                message: "Choose file",
                choices // в value здесь список файлов
            },
            {
                name: "searchString",
                type: 'input',
                message: "Enter the string to search in file: ",
                choices
            }
            ])
        })
        .then(({ fileName, searchString }) => {
            const currentDir = path.join(dirname, fileName);
            // console.log(searchString);
            stat(currentDir, (err, stats) => {
                // console.log(stats);
                if (stats.isDirectory()) {
                    console.log(`Directory ${fileName}`);
                    
                    console.log(`Path ${currentDir}`);
                    showFile(currentDir);
                } else {
                    // console.log(`file: ${currentDir}`);
                    const rs = fs.createReadStream(currentDir, 'utf8');
                    const rl = readline.createInterface({input: rs});

                    rl.on('line', (line) => {
                        if (line.includes(searchString)) {
                            const ws = fs.createWriteStream('match.js');
                            ws.write(line);
                        }
                    })
                }
            });
        })
}

const rl = readline.createInterface({ input, output });

rl.question('Input the path:', (answer) => {
    console.log(`Path: ${answer}`);
    const __dirname = answer;
    rl.close()
    showFile(__dirname);
}); 