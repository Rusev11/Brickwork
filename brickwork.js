const handleInput = require('./handleInput');
const inputValidation = require('./inputValidation');
const solveLayer = require('./solveLayer');
const addSymbols = require('./addSymbols');
const printLayer = require('./printLayer');

const brickwork = async () => {  // main function 

    let [rows, columns, firstLayer] = await handleInput(); //read the input and initialize the rows, columns and first layer

    if (!inputValidation(rows, columns, firstLayer)) { //validate if the input data is correct 
        return;
    }

    let secondLeyer = solveLayer(rows, columns, firstLayer); // derive the result of the solution in a new array
    let outputArray = addSymbols(secondLeyer, '*'); // add symbols and format the layer 
    printLayer(outputArray); // print the second layer to the console
    return;
}

brickwork(); //main function is called firstly
