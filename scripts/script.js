const gridContainer = document.querySelector('.grid-container');
const gridHeight = gridContainer.offsetHeight;
let squares;
const reset = document.querySelector('#reset');
const gridCreate = document.querySelector('#create-grid');
const rainbowButton = document.querySelector('#rainbow-mode');
let rainbowMode = true;
let color = 'rgba(88,192,217,255)';


function createRows(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement('div');
    row.style.cssText = `display: flex; flex: 1;`;
    row.id = `row-${i+1}`;
    const rowIdentifier = i+1;
    createSquares(gridSize, row, rowIdentifier);
    gridContainer.appendChild(row);
  }
}

function createSquares(numOfSquares, row, rowId) {
  for (let i = 0; i < numOfSquares; i++) {
    const square = document.createElement('div');
    square.style.cssText = 'flex: 1; border: 1px solid lightgray;';
    square.id = `square-${rowId}-${i+1}`;
    row.appendChild(square);
  }
}

function resetGrid() {
  let child = gridContainer.lastElementChild;
  while (child) {
    gridContainer.removeChild(child);
    child = gridContainer.lastElementChild;
  }
}

function addEvents() {
  squares = document.querySelectorAll(`[id*="square"]`);
  squares.forEach(square => square.addEventListener('mouseover', changeBackground));
}

function createGrid(gridSize) {
  resetGrid();
  createRows(gridSize);
  addEvents();
}

function changeBackground() {
  let currentBg = window.getComputedStyle(this).getPropertyValue('background-color');
  console.log(currentBg);
  if (currentBg === 'rgba(0, 0, 0, 0)') {
    if (rainbowMode) {
      generateRandomColor();
    } else {
      color = 'rgba(0, 0, 0, 0.1)'
    }
    
    this.style.cssText += `background-color: ${color};`;
  } else {
    let alpha = currentBg.match(/[^,]+(?=\))/);
    let newAlpha = +alpha[0] + 0.1;
    color = currentBg.replace(/[^,]+(?=\))/, newAlpha);
    this.style.cssText += `background-color: ${color};`;
  }
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  color = `rgba(${r}, ${g}, ${b}, 0.1)`;
}

function gridResetButton() {
  resetGrid();
  createGrid(16);
}


function gridCreateButton() {
  resetGrid();
  const gridSize = document.querySelector('#grid-size').value;
  if (gridSize > 100) {
    alert('Max grid size is 100!');
  } else {
    createGrid(gridSize);
  }

}

function toggleRainbowMode() {
  switch (rainbowMode) {
    case true:
      rainbowMode = false;
      color = 'rgba(0, 0, 0, 0.1)';
      break;
    case false:
      rainbowMode = true;
      break;
  }
}

createGrid(16);

reset.addEventListener('click', gridResetButton);
gridCreate.addEventListener('click', gridCreateButton);
rainbowButton.addEventListener('click', toggleRainbowMode);


/*
RAINBOW MODE

- create variable to act as a rainbow mode toggle
- create a global color variable, default to black
- on change background:
  - if rainbow mode is on, generate random color
  - continue as usual
  */