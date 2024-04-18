let rs = require("readline-sync");

const ships = [];
const alphabet = "ABC";
const fleetCount = 2;
let counter = 0;
let calledUnits = [];
let grid = [];

const getRandomNum = (num) => {return Math.floor(Math.random() * num)}

function generateUnits(num, alphabet) {
  let units = 0;
  const gridSize = alphabet.length;
  while (units < num) {
    const randomNum = getRandomNum(gridSize) + 1;
    const randomLet = alphabet[getRandomNum(gridSize)];
    let coord = randomLet + randomNum;
    ships.push(coord);
    units++;
  }
}

function createGrid(num) {
  for (let i = 0; i < num; i++) {
    grid[i] = [];
    for (let j = 0; j < num; j++) {
      grid[i][j] = [alphabet[i] + (j + 1)];
    }
  }
  return grid.flat();
}

function shipStatus() {
  counter = ships.length;
    const enterLocation = rs.question(
      "Enter a location to strike! (A-C, 1-3 ie. 'A2') "
    ).toUpperCase();
    if(enterLocation === '') {
      console.log("This is an invalid input..");
    } else if(calledUnits.includes(enterLocation)) {
      console.log("You have already picked this location. Miss!");
    } else if(ships.includes(enterLocation)) {
      ships.splice(ships.indexOf(enterLocation), 1);
      counter--;
      console.log("HIT!! You have sunk a battleship. " + counter + " ship(s) remaining")
      calledUnits.push(enterLocation);
    } else {
      console.log('You have missed!')
      calledUnits.push(enterLocation);
    }
}

const restartGame = (alphabet, fleetSize) => {
  const playAgain = rs.keyInYN("Would you like to play again? ");
    if (playAgain) {
      calledUnits = [];
      playGame(alphabet, fleetSize);
    } else {
      console.log("Goodbye.");
      process.exit();
    }
}

function playGame(alphabet, fleetSize) {
  const gridSize = alphabet.length;
  createGrid(gridSize);
  generateUnits(fleetSize, alphabet);
  console.log(ships);
  shipStatus();
  while (ships.length > 0) {
    shipStatus();
  }
  console.log("You destroyed all the battleships!")
  restartGame(alphabet, fleetSize);
}

// Game start

rs.keyInPause("Press any key to start the game ");
playGame(alphabet, fleetCount);