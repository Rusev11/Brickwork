const validateColumnsNumber = (columns, firstLayer) => { //check if every row has exactly M columns
    for (let row = 0; row < firstLayer.length; row += 1) {
        if (firstLayer[row].length !== columns) {
            return false;
        }
    }
    return true;
}

const checkBricksSize = (firstLayer) => {   //check if bricks are spanning more than 2 fields 

    let foundBricks = {};   //initialize object which will contain the number of occurrences and position of found bricks

    for (let row = 0; row < firstLayer.length; row += 1) {
        for (let column = 0; column < firstLayer[row].length; column += 1) {
            let currentBrick = firstLayer[row][column];     
            if (!foundBricks[currentBrick]) {   //if currentBrick number is found for the first time it is writen in foundBrick object
                foundBricks[currentBrick] = [1, row, column];
            } else {     //currentBrick is not found for the first time
                let rowExistingBrick = foundBricks[currentBrick][1];      //get the row number of the brick already found
                let columnExistingBrick = foundBricks[currentBrick][2];  //get the column number of the brick already found
                let existingBrickCount = foundBricks[currentBrick][0];   //get how many times the brick is found 
                if (existingBrickCount > 1) {   //check if current brick is found more than 2 times
                    console.log('-1 Bricks should not be larger than  2 fields');
                    return false;
                }
                if (    //check if the brick is not a rectangular with size 1x2
                    (Math.abs(columnExistingBrick - column) === 1 && Math.abs(rowExistingBrick - row) === 1) ||
                    (Math.abs(columnExistingBrick - column) > 1 || Math.abs(rowExistingBrick - row) > 1)
                ) {  
                    console.log('-1 Bricks should be rectangles with size 1x2');
                    return false;
                }
                foundBricks[currentBrick][0] += 1;  // increment the number of findings of the brick with 1
            }
        }
    }
    let brickNumbers = Object.keys(foundBricks); //initialize an array with keys of the foundBricks object
    for (let brick of brickNumbers) { 
        let currentBrickFoundNumber = foundBricks[brick][0]; //get how many times current brick is found
        if (currentBrickFoundNumber < 2) { 
            console.log('-1 Bricks should be rectangles with size 1x2');
            return false;
        }
    }
    return true;
}

const inputValidation = (rows, columns, firstLayer) => { //make several checks to validate the input data
    if (rows > 99 || columns > 99) {
        console.log('-1 N and M should be less than 100');
        return false;
    }
    if (rows < 1 || columns < 1) {
        console.log('-1 N and M should be greater than 1');
        return false;
    }
    if (rows % 2 !== 0 || columns % 2 !== 0) {
        console.log('-1 N and M should be even numbers');
        return false;
    }
    if (!validateColumnsNumber(columns, firstLayer)) { //check if every row has exactly M columns
        console.log('-1 Columns should be equal to M');
        return false;
    }
    if (!checkBricksSize(firstLayer)) { //check if bricks are spanning more than 2 fields 
        return false;
    }
    return true;
}

module.exports = inputValidation;