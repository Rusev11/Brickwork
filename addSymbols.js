const devideBricksHorizontally = (outputArray, symbol) => { //add sumbols between the bricks in the rows
    for (let row = 0; row < outputArray.length; row += 1) {
        for (let column = 1; column < outputArray[row].length; column += 1) {
            if (Number(outputArray[row][column]) !== Number(outputArray[row][column - 1])) { //if the content of the current field is different from the content of the field in the previus column
                outputArray[row].splice(column, 0, symbol);                                   // add a symbol between the two fields
                column += 1;
            } else {                                       // if the content of the field is the same as that in the previous column
                outputArray[row].splice(column, 0, ' ');    // add space betweeb them
                column += 1;
            }
        }
    }
}

const devideBricksVertically = (outputArray, symbol) => {  // add symbows between the rows in the layer
    for (let row = 0; row < outputArray.length - 1; row += 2) {

        outputArray.splice(row + 1, 0, []); // add an empty row between the current one and the next one

        for (let column = 0; column < outputArray[row].length; column++) {
            if ((outputArray[row][column] === outputArray[row + 2][column] &&  // if the content of the two sequential fields in one column is equal 
                outputArray[row][column] !== symbol &&                         // add ' ' or '  ' depending if  
                outputArray[row][column] !== ' ')) {                           // there are single or double numbers
                if (outputArray[row][column].length > 1) {
                    outputArray[row + 1].push('  ');
                } else {
                    outputArray[row + 1].push(' ');
                }
            } else {                                                            // if the content is different
                if (outputArray[row][column].length > 1) {                      // add '*' or '**' depending if the
                    outputArray[row + 1].push(symbol + symbol);                 // there are single or double numbers
                } else {
                    outputArray[row + 1].push(symbol);
                }
            }
        }
    }
}

const addOutsideCountour = (outputArray, symbol) => { // add outside contour of the layer with symbols 
    outputArray.forEach(e => {    // add symbol in the begining and in the end of each row        
        e.unshift(symbol);
        e.push(symbol);
    })

    outputArray.unshift([]); //add an empty row before the first one 
    outputArray.push([]);    //add an empty row after the last one 
    let columns = outputArray[1].length; //number of the columns in the layer
    let additionalSymbols = 0; //additional symbols which should be added because of double digit numbers in the columns

    for (let column = 0; column < columns + additionalSymbols; column += 1) {
        if (outputArray[1][column].length === 2) {                        //if the current column contents double digit number
            outputArray[0].push(symbol + symbol);                          // add two symbols at the top
            outputArray[outputArray.length - 1].push(symbol + symbol);     // and at the bottom of the column
        } else {                                                // if the column contents only single digits number
            outputArray[0].push(symbol);                         // add one symbol at the top
            outputArray[outputArray.length - 1].push(symbol);    // and one at the bottom of the column
        }
    }
}

const parseLayerToString = (layer) => {  //derive a new array with strings insted of numbers
    let layerToString = [];
    layer.forEach(row => {
        layerToString.push(row.map(column => column.toString()));
    })
    return layerToString;
}

const addSpacesToSingleDigitNumbers = (layer) => {  //add spaces to single digit number if there is a double digit number in the same column
    let rows = layer.length;         // derive the number of layer rows
    let columns = layer[0].length;   // derive the number of layer columns
    let layerWithStrings = parseLayerToString(layer);  //initialize an array with strings insted of numbers

    for (let column = 0; column < columns; column += 1) {
        for (let row = 0; row < rows; row += 1) {
            if (layerWithStrings[row][column].length > 1) {    // if double digit number is found
                let currentColumn = column;                     // initialize the variable with this column number
                for (let currentRow = 0; currentRow < rows; currentRow += 1) {           //loop through all rows of this column
                    if (layerWithStrings[currentRow][currentColumn].length === 1) {                                // if a singe digit is found, 
                        layerWithStrings[currentRow][currentColumn] = ' ' + layerWithStrings[currentRow][column];   // a ' ' is placed before it
                    }
                }
                break; //break the loop for this column and continue with the next one
            }
        }
    }
    return layerWithStrings;
}

const handeSpacesInLayer = (outputArray) => {
    let outputArrayConverted = [];   // initialize a new array which will store the result of the conversion
    outputArray.forEach(e => {
        let array = e.join('').split('');  //each row of the layer is joined and splitted in order to obtain array with single chars only
        for (let column = 0; column < array.length; column += 1) {  //for every ellement of the array
            if (array[column] === '*' &&                            //check if there is ' ' between symbol and number
                array[column + 1] === ' ' &&                        // or symbos and symbol
                Number(array[column + 2]) > 1 &&
                Number(array[column + 2]) < 10
            ) {
                array[column + 1] = array[column + 2];             // if there are -> replace ' ' and the number/symbol
                array[column + 2] = ' ';
            }
        }
        let currentRow = array.join(' ');                          // joining the array to derive the current row for the converted array
        outputArrayConverted.push(currentRow);                     // push the current row as a last element of the concerted array
    })
    return outputArrayConverted;
}

const addSymbols = (secondLeyerSolved, symbol) => {
    let outputArray = addSpacesToSingleDigitNumbers(secondLeyerSolved); //add spaces to single digit number if there is a double digit number in the same column
    devideBricksHorizontally(outputArray, symbol); //add sumbols between the bricks in the rows
    devideBricksVertically(outputArray, symbol);   // add symbows between the rows in the layer
    addOutsideCountour(outputArray, symbol);       // add outside contour of the layer with symbols
    outputArray = handeSpacesInLayer(outputArray); //remove unwanted spaces between the symbols and the numbers
    return outputArray;
}

module.exports = addSymbols;