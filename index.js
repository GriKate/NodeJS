import http from "http";
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import url from 'url';
import { findRoute } from './routing.js'

const host = 'localhost'
const port = '3000'
const dirname = 'C:/Users/user/$Обучение/17 Node js/node-base'

fsp
    .readdir(path.join(dirname))
    .then((files) => {
        const routes = {
            "/:filename": (params) => {
                return files.find(item => item === +params.filename)
            },
        }
        fs.readFile('./index.html', (err, html) => {
            if (err) {
                throw err; 
            }



            http.createServer((req, res) => {
                if (req.method === 'GET') {
                    if (req.url !== '/favicon.ico') {
                        const queryParams = url.parse(req.url, true)
                        const routeParams = findRoute(req.url.split('?')[0], routes)
                        const [ routeCallback, params ] = routeParams;
                        console.log(params)

                        // const currentFile = params;
                        // если currentFile - директория, заходим
                        // если это файл - читаем
                    }
                }
                    let div = ``;
                    for (const el of files) {
                        div += `<div>${el}</div>`
                    }
                res.writeHeader(200, {"Content-Type": "text/html"});
                res.write(html + div);
                res.end();
            }).listen(port, host, () => console.log(`Server at ${host} ${port}`));
        })
    })

    // fsp
    // .readdir(path.join(dirname))
    // .then((files) => {
    //     console.log(files.join('\n'))
    // })