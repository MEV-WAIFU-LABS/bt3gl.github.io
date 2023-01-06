// **************************************************************//
//              bt3gl       - 2014                               //
//                    GAME OF LIFE IN JAVASCRIPT                 //
//                                                               //
//    Rules:                                                     //
// 1. Start with a random configuration of dead or alive cells   //
// 2. Loneliness: any cell with less than 2 neighbors will die   //
// 3. Overcrowd: any cell with more than 3 neighbors will die    //
// 4. Optimized: any cell with 3 neighbors will grow             //
//                                                               //
// **************************************************************//


// ***************************************************************//
//                                                                //
//                       FUNCTIONS                                //
//                                                                //
// ***************************************************************//



function clearBoard() {

    for (var i = 0; i < BOARD_WIDTH + 1; i++) {

        board_cells[i] = [];

        for (var j = 0; j < BOARD_HEIGTH + 1; j++) {

            board_cells[i][j] = 0;

        }
    }
}


function startFirstGeneration() {

    clearBoard();

    for (var i = 1; i < BOARD_WIDTH; i++) {

        for (var j = 1; j < BOARD_HEIGTH; j++) {

            var alive_or_dead = Math.floor(Math.random() * 2);
            board_cells[i][j] = alive_or_dead;

        }
    }
}




function startNextGeneration() {

    var this_generation_cells = []

    for (var i = 1; i < BOARD_WIDTH; i++) {

        this_generation_cells[i] = []

        for (var j = 1; j < BOARD_HEIGTH; j++) {

            var count = board_cells[i][j - 1];
            count += board_cells[i - 1][j];
            count += board_cells[i][j + 1];
            count += board_cells[i + 1][j];
            count += board_cells[i + 1][j + 1];
            count += board_cells[i - 1][j - 1];
            count += board_cells[i + 1][j - 1];
            count += board_cells[i - 1][j + 1];

            if  (count === 2) {

                this_generation_cells[i][j] = board_cells[i][j];

            } else if (count === 3) {

                this_generation_cells[i][j] = 1;

            } else {

                this_generation_cells[i][j] = 0;

            }
        }
    }
    // now update board_cells
    for (var i = 1; i < BOARD_WIDTH; i++) {

        for (var j = 1; j < BOARD_HEIGTH; j++) {

            board_cells[i][j] = this_generation_cells[i][j];
        }
    }

    console.log(this_generation_cells[1]);
    return this_generation_cells;
}



function printBoard(this_generation_cells) {

    for (var i = 1; i < BOARD_WIDTH; i++) {

        for (var j = 1; j < BOARD_HEIGTH; j++) {

            shift_i = i * SIZE_CELL;
            shift_j = j * SIZE_CELL;

            if (this_generation_cells[i][j] === 1) {

                context.fillStyle = CELL_COLOR;
                context.fillRect(shift_i, shift_j, SIZE_CELL, SIZE_CELL);

            } else {

                context.fillStyle = BACKGROUND_COLOR;
                context.fillRect(shift_i, shift_j, SIZE_CELL, SIZE_CELL);

            }
        }
    }
}



function printBoardAscII(this_generation_cells) {

    for (var i = 1; i < BOARD_WIDTH; i++) {

        for (var j = 1; j < BOARD_HEIGTH; j++) {

            if (this_generation_cells[i][j] === 1) {

                process.stdout.write(this_generation_cells[i][j] + " ");

            } else {
                process.stdout.write("0");

            }
        }
    process.stdout.write(" ");

    }
}











// ***************************************************************//
//                                                                //
//                THE GAME STARTS HERE                            //
//                                                                //
// ***************************************************************//


// board size + padding

var TIME = 1 / 200;

var board_cells = [];

var BOARD_WIDTH = 600;

var BOARD_HEIGTH = 300;

var SIZE_CELL = 1;

var BACKGROUND_COLOR = "#000000";

var CELL_COLOR = "#66FF66";

var game_canvas = document.getElementById("game");

var context = game_canvas.getContext('2d');


function startGraphicGame() {

    startFirstGeneration();

    setInterval(function() {

            var this_generation_cells = startNextGeneration();
            printBoard(this_generation_cells);

        }, TIME);

};


function startASCIIGame() {

    startFirstGeneration();

    setInterval(function() {

            var this_generation_cells = startNextGeneration();
            printBoardAscII(this_generation_cells);

        }, TIME);

};




//startASCIIGame();