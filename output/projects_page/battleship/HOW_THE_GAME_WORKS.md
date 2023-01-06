HOW THE GAME WORKS
==================

First, we define a class that define a class model for our ship. This class should hold attributes such as the number of ships, the board size, an array that will hold the information of where the ships are located and where they where hit.

As JavaScript is not efficient if we define methods inside the class (because in each instance would create a new process for the method in the memory) we create the methods using "prototype". The methods are the following:

* Fire: this method takes a parameter the user guess. If first loops in the array holding the information of where the ship is located, checking if there are any matches. If there is a hit, it display the a message to the user and then
save the hit information in the ship array. Finally, it checks whether the ships was sunk (calling the sunk method), returning true. In case it was not, it returns false.

* isSunk: This method just get the ship length (defined as 3) and then check the hit array to see whether it is all filled with "hit".

* generateShipLocate: This method is called when we start the game, after generating ship (another method), it fills the arrays if there is no location collision (another method).

* generateShip: This method uses the the Math.random to first decide whether the ship will be vertical or horizontal. After that, it uses Math.random again to generate positions for row and col. It returns this array.

* collision: this method checks whether there is a collision in the location of the ships.



Outside the class shipModel we define another objects to help the execution of our game:

* view: this object will generate the messages in the DOM in case of hit or miss.

* values: this object will just get the user guess, check if it is a hit and then display a message.

* parseGuess: this function literally parse the guess input, also checking its validity.



We also have event handlers for the buttons. After defining the above objects we start instantiating a ship from shipModel.

The game starts after the DOM loads, calling init() (window.onload). The init function calls the event for fire button click, getting the input from user and generating the ship locations.
