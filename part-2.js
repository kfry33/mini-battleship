let rs = require("readline-sync");

const ships = [];
const alphabet = "ABCDEFGHIJ";
let calledUnits = [];
let grid = [];

const shipType = [
    { name: "Destroyer", size: 2 },
    { name: "Submarine", size: 3 },
    { name: "Cruiser", size: 3 },
    { name: "Battleship", size: 4 },
    { name: "Carrier", size: 5 },
  ];

let fleetCount = shipType.reduce((a, c) => {
  return a + c.size;
}, 0);

const getRandomNum = (num) => {return Math.floor(Math.random() * num)}

const intersect = (ships, coordsArr) => {
    return coordsArr.some((item) => ships.includes(item));
}

function generateUnits(alphabet) {
  const gridSize = alphabet.length;

  for(let s = 0; s < shipType.length; s++){
    let units = 0;
    let coordsArr = shipType[s].size;
    while (units < coordsArr) {
      let randomNum = getRandomNum(gridSize) + 1;
      const randomLetI = getRandomNum(gridSize);
      let dir = getRandomNum(2);

      // horizontal
      if(dir === 0) {
        if(randomNum + (coordsArr - 1) <= gridSize) {
          for(let i=0; i<coordsArr; i++){
            console.log('i am here at 0 ' + alphabet[randomLetI] + (randomNum + i));
            ships.push(alphabet[randomLetI] + (randomNum + i));
            units++;
          }
        } else {
            return generateUnits(alphabet)
        }
      } else {
        // vertical
        if(randomLetI + (coordsArr - 1) <= gridSize) {
          for(let i=0; i<coordsArr; i++) {
            console.log('i am here at 1 ' + alphabet[randomLetI + i] + randomNum);
            ships.push(alphabet[randomLetI + i] + randomNum);
            units++;
          } 
        } else {
            return generateUnits(alphabet)
        }
      }
      if(intersect(ships, coordsArr)) {
        return generateUnits(alphabet)
      } else {
        return ships;
      }
    } 
  } return ships;
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
      let counter = ships.length;
      const enterLocation = rs.question(
        "Enter a location to strike! (A-J, 1-10 ie. 'A2') "
      ).toUpperCase();
      if(enterLocation === '') {
        console.log("This is an invalid input..");
      } else if(calledUnits.includes(enterLocation)) {
        console.log("You have already picked this location. Miss!");
      } else if(ships.includes(enterLocation)) {
        ships.splice(ships.indexOf(enterLocation), 1);
        counter--;
        console.log("HIT!!")
        calledUnits.push(enterLocation);
      } else {
        console.log('Miss!!')
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
  generateUnits(alphabet);
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