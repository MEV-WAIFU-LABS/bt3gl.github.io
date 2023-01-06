/* Attributes and methods for the shipModel function */

var shipModel = function() {
    this.boardSize = 7;
    this.numShips = 3;
    this.shipLength = 3;
    this.shipsSunk = 0;
    this.ships = [{
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }, {
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }, {
        locations: [0, 0, 0],
        hits: ["", "", ""]
    }];
};

shipModel.prototype.fire = function(guess) {
    for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        var index = ship.locations.indexOf(guess);
        if (ship.hits[index] === "hit") {
            view.displayMessage(ALREADY_HIT);
            return true;
        } else if (index >= 0) {
            ship.hits[index] = "hit";
            view.displayHit(guess);
            view.displayMessage(HIT);

            if (this.isSunk(ship)) {
                view.displayMessage(YOU_SANK_ONE);
                this.shipsSunk++;
            }
            return true;
        }
    }
    view.displayMiss(guess);
    view.displayMessage(YOU_MISSED);
    return false;
};

shipModel.prototype.isSunk = function(ship) {
    for (var i = 0; i < this.shipLength; i++) {
        if (ship.hits[i] !== "hit") {
            return false;
        }
    }
    return true;
};

shipModel.prototype.generateShipLocations = function() {
    var locations;
    for (var i = 0; i < this.numShips; i++) {
        do {
            locations = this.generateShip();
        } while (this.collision(locations));
        this.ships[i].locations = locations;
    }
    console.log("Ships array: ");
    console.log(this.ships);
};


shipModel.prototype.generateShip = function() {
    var direction = Math.floor(Math.random() * 2);
    var row, col;
    if (direction === 1) { // horizontal
        row = Math.floor(Math.random() * this.boardSize);
        col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
    } else { // vertical
        row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        col = Math.floor(Math.random() * this.boardSize);
    }
    var newShipLocations = [];
    for (var i = 0; i < this.shipLength; i++) {
        if (direction === 1) {
            newShipLocations.push(row + "" + (col + i));
        } else {
            newShipLocations.push((row + i) + "" + col);
        }
    }
    return newShipLocations;
};

shipModel.prototype.collision = function(locations) {
    for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        for (var j = 0; j < locations.length; j++) {
            if (ship.locations.indexOf(locations[j]) >= 0) {
                return true;
            }
        }
    }
    return false;
};



/* process message */
var view = {
    displayMessage: function(msg) {
        var messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location) {
        var cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }

};


/* Process guesses values */
var controller = {
    guesses: 0,
    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = shipModel.fire(location);
            if (hit && shipModel.shipsSunk === shipModel.numShips) {
                view.displayMessage(YOU_SANK + this.guesses);
            }
        }
    }
};


/* Helper function to parse a guess from the user */
function parseGuess(guess) {
    var alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
        alert(GUESS_INSTRUCTIONS);
    } else {
        var firstChar = guess.charAt(0);
        var row = alphabet.indexOf(firstChar);
        var column = guess.charAt(1);

        if (isNaN(row) || isNaN(column)) {
            alert(NOT_VALID);
        } else if (row < 0 || row >= shipModel.boardSize ||
            column < 0 || column >= shipModel.boardSize) {
            alert(NOT_BOARD);
        } else {
            return row + column;
        }
    }
    return null;
};



/* event handlers */
function handleFireButton() {
    var guessInput = document.getElementById("guessInput");
    var guess = guessInput.value.toUpperCase();
    controller.processGuess(guess);
    guessInput.value = "";
};



/* Here we just handle the fire button/ inputs */
function handleKeyPress(e) {
    var fireButton = document.getElementById("fireButton");
    if (e.keyCode === 13) {
        fireButton.click();
        return false;
    }
};



/* The game starts here.
    init: called when the page has completed loading
    */
// Text variables
GUESS_INSTRUCTIONS = "Please enter a letter and a number within the board."
NOT_BOARD = "Please choose something within the board."
NOT_VALID = "Please choose valid values."
YOU_SANK_ONE = "Oh, no!!! You sank my battleship!!!"
YOU_SANK = "You sank all my battleships. Number of Guesses: "
ALREADY_HIT = "You already hit that location!!!"
HIT = "You hit one of my battleship!!!"
YOU_MISSED = "You missed..."

// Instance of a new ship
var shipModel = new shipModel();

// when the windows is loaded
window.onload = init;

// the traditional init function
function init() {
    // Fire! button onclick handler
    var fireButton = document.getElementById("fireButton");
    fireButton.onclick = handleFireButton;

    // handle "return" key press
    var guessInput = document.getElementById("guessInput");
    guessInput.onkeypress = handleKeyPress;

    // place the ships on the game board
    shipModel.generateShipLocations();
}
