import http from "http";
import fs from 'fs';
import fsp from 'fs/promises';
import { readFile, stat } from 'node:fs/promises';
// import { stat } from 'node:fs';
import path from 'path';
import url from 'url';
import { findRoute } from './routing.js'

const host = 'localhost'
const port = '3000'
const dirname = 'C:/Users/user/$Обучение/17 Node js/node-base'

const readHtml = async (filePath) => {
    const contents = await readFile(filePath, { encoding: 'utf8' });
    return contents;
}

const isDir = async (filePath) => {
    const a = await stat(filePath).then(stats => {
        return stats.isDirectory();
    })
    return a
}

const showFile = async (filePath) => {
    const fileType = await isDir(filePath)

    if (fileType) {
        const files = fsp.readdir(path.join(filePath))
        return files;
    } else {
        const file = readFile(filePath, { encoding: 'utf8' });
        return file;
    }
}

const routes = {
    "/": () => {
        const html = readHtml('./index.html')
        const fileName = dirname;
        const currentFile = showFile(fileName)
        console.log(html + currentFile)
        // return html + currentFile;
        return currentFile;
    },
    "/:filename": (params) => {
        const fileName = path.join(dirname, params.filename);
        const currentFile = showFile(fileName)
        return currentFile;
    }
}

http
.createServer((req, res) => {
    let file = ``;
    const queryParams = url.parse(req.url, true)
    const routeParams = findRoute(req.url.split('?')[0], routes)
    const [ routeCallback, params ] = routeParams;

    if (req.method === 'GET') {
        if (req.url !== '/favicon.ico') {
            if (typeof routeCallback === 'function') {
                routeCallback(params)
                .then(data => {
                    file = data;
                    if (typeof file !== 'string') {
                        // console.log('file   ' + typeof file)
                        file = file.join(', ')
                    }
                    res.writeHeader(200, {"Content-Type": "text/html"});
                    res.end(file);
                })
            }
        }
    }
}).listen(port, host, () => console.log(`Server at ${host} ${port}`));