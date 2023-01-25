import inquirer from "inquirer";
import fsp from 'fs/promises';
import path from 'path';

const __dirname = 'C:/Users/user/$Обучение/17 Node js/node-base'; 
// pwd выводит C:\Users\node-base, заменить левые слэши на правые!!!

fsp
    .readdir(path.join(__dirname)) // вернет список файлов в __dirname
    .then(async (indir) => {
        const list = []
        for (const item of indir) {
            const src = await fsp.stat(path.join(__dirname, item))
            if (src.isFile()) list.push(item)
        }
        return list // возвращаем список файлов в следующий then
    })
    .then((choices) => {
        return inquirer
        .prompt({
            name: "fileName",
            type: 'list', // input, number, confirm, list, rawlist, expand, checkbox, password
            message: "Choose file",
            choices // в value здесь список файлов
        })
    })
    // чтение файла
    .then(({ fileName }) => fsp.readFile(path.join(__dirname, fileName), 'utf-8'))
    // выводим в консоль
    .then(console.log)
