const gridContainer = document.querySelector('.grid-container');
const gridHeight = gridContainer.offsetHeight;
let squares;
const reset = document.querySelector('#reset');
const gridCreate = document.querySelector('#create-grid');
const rainbowButton = document.querySelector('#rainbow-mode');
const colorButton = document.querySelector('#color-mode');
const eraserButton = document.querySelector('#eraser-mode');
const darkenButton = document.querySelector('#darken-mode');
const lightenButton = document.querySelector('#lighten-mode');
const input = document.querySelector('input');
const colorPicker = document.querySelector('#color-picker');
const pickerWrapper = document.querySelector('#picker-bg');
const gridToggle = document.querySelector('#grid-toggle')
let rainbowMode = true;
let colorMode = false;
let eraserMode = false;
let darkenMode = false;
let lightenMode = false;
let gridOn = false;
let color = colorPicker.value;

pickerWrapper.style.backgroundColor = colorPicker.value;

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
    square.style.cssText = 'flex: 1;';
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

function turnOn() {
  squares = document.querySelectorAll(`[id*="square"]`);
  squares.forEach(square => square.addEventListener('mouseover', changeBackground));
  squares.forEach(square => square.addEventListener('touchstart', changeBackground));
  gridContainer.removeEventListener('click', turnOn);
  gridContainer.addEventListener('click', turnOff);
}

function turnOff() {
  squares = document.querySelectorAll(`[id*="square"]`);
  squares.forEach(square => square.removeEventListener('mouseover', changeBackground));
  gridContainer.removeEventListener('click', turnOff);
  gridContainer.addEventListener('click', turnOn);
}

function createGrid(gridSize) {
  resetGrid();
  createRows(gridSize);
}

function changeBackground() {

  if (colorMode) {
    this.style.cssText += `background-color: ${color}`;
  } 
  
  else if (rainbowMode) {
    generateRandomColor();
    this.style.cssText += `background-color: ${color}`;
  }
  
  else if (eraserMode) {
    this.style.cssText += `background-color: rgba(255, 255, 255, 0.5)`;
  }
  
  else if (darkenMode) {
    let currentBg = window.getComputedStyle(this).getPropertyValue('background-color');
    let alpha = currentBg.match(/[^,]+(?=\))/);
    let newAlpha = +alpha[0] + 0.1;
    color = currentBg.replace(/[^,]+(?=\))/, newAlpha);
    this.style.cssText += `background-color: ${color};`;
  }
  
  else if (lightenMode) {
    let currentBg = window.getComputedStyle(this).getPropertyValue('background-color');
    let alpha = currentBg.match(/[^,]+(?=\))/);
    let newAlpha = +alpha[0] - 0.1;
    console.log(alpha);
    console.log(newAlpha);
    color = currentBg.replace(/[^,]+(?=\))/, newAlpha);
    this.style.cssText += `background-color: ${color};`;
  }
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);

  color = `rgba(${r}, ${g}, ${b}, 0.5)`;
}

function convertColor(hex) {
  let c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      c= hex.substring(1).split('');
      if(c.length== 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+',0.8)';
  }
  throw new Error('Bad Hex');

}

function setColor() {
  let hex = colorPicker.value;
  color = convertColor(hex);
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
  rainbowMode = true;
  colorMode = false;
  eraserMode = false;
  darkenMode = false;
  lightenMode = false;
}

function toggleColorMode() {
  rainbowMode = false;
  colorMode = true;
  eraserMode = false;
  darkenMode = false;
  lightenMode = false;
  setColor();
  updatePickerBg();
}

function toggleEraserMode() {
  rainbowMode = false;
  colorMode = false;
  eraserMode = true;
  darkenMode = false;
  lightenMode = false;
}

function toggleDarkenMode() {
  rainbowMode = false;
  colorMode = false;
  eraserMode = false;
  darkenMode = true;
  lightenMode = false;
}

function toggleLightenMode() {
  rainbowMode = false;
  colorMode = false;
  eraserMode = false;
  darkenMode = false;
  lightenMode = true;
}

function toggleGrid() {
  gridContainer.classList.toggle('grid-on');
}

function checkKey(e) {
  console.log(e.code);
  if (e.code === 'Enter' || e.code ==='NumpadEnter') gridCreateButton();
}

function updatePickerBg() {
  pickerWrapper.style.backgroundColor = colorPicker.value;
}

createGrid(16);

reset.addEventListener('click', gridResetButton);
gridCreate.addEventListener('click', gridCreateButton);
rainbowButton.addEventListener('click', toggleRainbowMode);
colorButton.addEventListener('click', toggleColorMode);
darkenButton.addEventListener('click', toggleDarkenMode);
lightenButton.addEventListener('click', toggleLightenMode);
eraserButton.addEventListener('click', toggleEraserMode);
gridToggle.addEventListener('click', toggleGrid);
colorPicker.addEventListener('change', toggleColorMode);
colorPicker.addEventListener('click', toggleColorMode);
gridContainer.addEventListener('click', turnOn);

input.addEventListener('keydown', checkKey);
