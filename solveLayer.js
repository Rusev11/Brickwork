const isCovered = (row, column, secondLayer) => {  // check if the current field in second layer is filled with brick number
    if (secondLayer[row][column] !== 0) {
        return true;
    }
    return false;
}

const isFirstLayerBrickHorizontal = (row, column, firstLayer) => {  // checks if the brick in current field is orientated 
    if (firstLayer[row][column] === firstLayer[row][column + 1]) {  // horizontally or not
        return true;
    }
    return false;
}

const getEmptySecondLayer = (rows, columns) => { //derive an array with size NxM and filled with 0
    let emptyLayer = [];
    for (let row = 0; row < rows; row += 1) {           // for every row push in emptyLayer an array with 
        emptyLayer.push(new Array(columns).fill(0));    // length equal to columns and filled with 0
    }
    return emptyLayer;
}

const solution = (rows, columns, firstLayer) => {
    let secondLayer = getEmptySecondLayer(rows, columns); // derive an array filled with 0 with a size of the first Layer
    let brickCounter = 1; // brickCounter which will count the current brick number
    for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
            if (isCovered(row, column, secondLayer)) {   //check if the current field of the secondLayer is already filled
                continue;
            }
            secondLayer[row][column] = brickCounter; //if the current field is empty (0), it is filled with the number of current brick
            if (column + 1 === columns) {  //if the current field is in the last column, the current brick will be orientated vertically
                secondLayer[row + 1][column] = brickCounter;
            } else if (isFirstLayerBrickHorizontal(row, column, firstLayer)) { //if the brick in this field in first layer is horizontal
                if (row + 1 < rows) {                                          // and the current field is not in the last row
                    secondLayer[row + 1][column] = brickCounter;               // the current brick is orientated vertically in the second layer                    
                }
            } else {                                                           //if the brick in this field in first layer is vertically orientated
                secondLayer[row][column + 1] = brickCounter;                   //the brick in this field in the second layer is horizontally orientated
            }
            brickCounter++;
        }
    }
    return secondLayer;
}

module.exports = solution;