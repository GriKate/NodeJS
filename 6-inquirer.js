import inquirer from "inquirer";

inquirer
    .prompt({
        name: "fileName", // вариант ответа, к-ый ожидаем от пользователя
        type: 'list', // типы вывода: input, number, confirm, list, rawlist, expand, checkbox, password
        message: "Choose file",
        choices: ['file_a', 'file_b', 'file_c', 'file_d',]
    })
    .then(({ fileName }) => console.log(fileName)) 
    // получаем значение деструктивным присваиванием по ключу объекта (задали в name)