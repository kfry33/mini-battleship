let rs = require("readline-sync");

let ships = [];
const alphabet = "ABCDEFGHIJ";
let calledUnits = [];
let grid = [];
let hits = 0;

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
    return coordsArr.some((item) => ships.flat().includes(item));
}

function generateUnits(alphabet, ship) {
  const gridSize = alphabet.length;
  const coordsArr = [];

  let randomNum = getRandomNum(gridSize) + 1;
  const randomLetI = getRandomNum(gridSize);
  let dir = getRandomNum(2);
  
  while (coordsArr.length < ship.size) {
    
    const paramsOne = dir === 0 ? randomNum : randomLetI;

      // horizontal
      if(paramsOne + ship.size <= gridSize) {
        for(let i=0; i<ship.size; i++){
          const newCoord =
          dir === 0 
          ? alphabet[randomLetI] + (randomNum + i)
          : alphabet[randomLetI + i] + randomNum;
          coordsArr.push(newCoord);
        }
      } else {
          return generateUnits(alphabet, ship)
      }
  } 

  if(intersect(ships, coordsArr)) {
    return generateUnits(alphabet, ship)
  } 

  return coordsArr;
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
      } else if(ships.flat().includes(enterLocation)) {
        hits++;
        console.log("HIT!!");
        calledUnits.push(enterLocation);
      } else {
        console.log('Miss!!');
        calledUnits.push(enterLocation);
      } 
  }

const restartGame = (alphabet, fleetSize) => {
  const playAgain = rs.keyInYN("Would you like to play again? ");
    if (playAgain) {
      hits = 0;
      ships = [];
      calledUnits = [];
      playGame(alphabet, fleetSize);
    } else {
      console.log("Goodbye.");
      process.exit();
    }
}

function playGame(alphabet, fleetSize) {
  rs.keyInPause("Press any key to start the game ");
  const gridSize = alphabet.length;
  createGrid(gridSize);
  shipType.forEach((ship) => ships.push(generateUnits(alphabet, ship)));
  // generateUnits(alphabet);
  console.log(ships);
  shipStatus();
  while (hits < fleetSize) {
    shipStatus();
  }
  console.log("You destroyed all the battleships!")
  restartGame(alphabet, fleetSize);
}

// Game start


playGame(alphabet, fleetCount);