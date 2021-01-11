const readFromConsole = () => { //read a new line from console
    return new Promise(resolve => {  // return promise because of asynchronious reading from console 
        const readline = require('readline'); // initialize readline object from 'readline' module
        const rl = readline.createInterface({ //create readline interface instance
            input: process.stdin,
            output: process.stdout
        })

        rl.question('', (input) => { //read from console and invoke callback function with the provided input as argument
            rl.close();
            resolve(input); //resolve the input 
        })
    })
}


const handleInput = async () => {
    let firstLayer = []; // initialize an empty array which will be filled with the input data
    let [rows, columns] = (await readFromConsole()).split(' ').map(e => Number(e)); //read first line (N and M), split and parse to numbers

    for (let row = 0; row < rows; row += 1) { //read every row and fill firstLayer array with numbers
        firstLayer.push((await readFromConsole()).split(' ').map(e => Number(e)));
    }

    return [rows, columns, firstLayer];
}

module.exports = handleInput;