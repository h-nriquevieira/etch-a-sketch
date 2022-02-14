const gridContainer = document.querySelector('.grid-container');
const gridHeight = gridContainer.offsetHeight;


function createRows(gridSize) {
  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement('div');
    row.style.cssText = `display: flex; flex: 1; border: 1px solid red;`;
    row.id = `row-${i+1}`;
    const rowIdentifier = i+1;
    createSquares(gridSize, row, rowIdentifier);
    gridContainer.appendChild(row);
  }
}

function createSquares(numOfSquares, row, rowId) {
  for (let i = 0; i < numOfSquares; i++) {
    const square = document.createElement('div');
    square.style.cssText = 'flex: 1; border: 1px solid purple;';
    square.id = `square-${rowId}-${i+1}`;
    row.appendChild(square);
  }
}


/* 
- Get grid size and store it in a variable
- Divide container height by grid size to get square side
- Create a row container
- Create gridSize number of squares with squareSide and add them to row container
- Create gridSize number of rowContainers
- Add all of them to grid container
*/