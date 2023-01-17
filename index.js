// const myName = "Ann";
// console.log(myName);

// console.log(process.argv);
// const args = process.argv.slice(2) //отрезать первые 2
// console.log(`args: ${args[0]}`);

// вывод ПРОСТЫХ чисел: зелёный, жёлтый, красный

const range = [...process.argv.slice(2)].map(el => Number(el)); //вернет массив из 2х чисел
const start = range[0];
const end = range[1];
let color = {
    1: '32',
    2: '33',
    3: '31'
};
let rangeNumber = 1;
let hasSimpleInt = false;

if (!Number.isInteger(start) || !Number.isInteger(end)) {
    console.log('\x1b[31m Error: not integer \x1b[0m');
} else {
    if (end < start) {
        console.log('\x1b[31m Incorrect values! \x1b[0m'); //32 33 31
    } else {
        if (start < 2) {
            start = 2;
        }
        let num = start;
        if (start === 2) {
            console.log(`\x1b[${color[rangeNumber]}m ${num} \x1b[0m`);
            rangeNumber ++;
        }
    
        while (num <= end) {
            for (let i = 2; i < num; i++) {
                if (num % i === 0) {
                    // console.log(`${num} делится на ${i} без остатка, выход`);
                    i = num;
                    continue;
                }
                if (i === num - 1) {
                    console.log(`\x1b[${color[rangeNumber]}m ${num} \x1b[0m`);
                    rangeNumber ++;
                    if (rangeNumber > 3) rangeNumber = 1;
                    hasSimpleInt = true;
                }
            }
            num ++;
        }
        if (hasSimpleInt === false) console.log('\x1b[31m No simple integers! \x1b[0m');
    }
}