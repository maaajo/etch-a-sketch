"use strict";
const INITIAL_SIZE = 16;
const INITIAL_COLOR = 'black';
const gridSection = document.getElementById('grid-section');
const rainbowButton = document.getElementById('rainbow-btn');
const clearButton = document.getElementById('clear-btn');
let gridItems = '';

rainbowButton.addEventListener('click', function() {
    runRainbow(gridItems, this);
});
clearButton.addEventListener('click', function() {
    createNewUserGrid(gridItems);
});

let gridWrapper = createGridWrapper();
gridSection.appendChild(gridWrapper);
runGridDrawing(INITIAL_SIZE, gridWrapper);


function runGridDrawing(size, wrapper) {
    gridItems = createGrid(wrapper, size);
    addMouseOverColoring(gridItems);
};

function createGridWrapper() {
    const gridContainer = document.createElement('div')
    gridContainer.className = 'grid';
    return gridContainer;
}

function createGrid(location, size) {
    let gridRectArr = [];
    for (let i = 1; i <= size; i++) {
        let gridRow = createGridRow(i, size);
        location.appendChild(gridRow);
        for (let j = 1; j <= size; j++) {
            let gridRowItem = createGridRowItem(i, j);
            gridRectArr.push(gridRowItem);
            gridRow.appendChild(gridRowItem);
        }
    }
    return gridRectArr;
}

function addMouseOverColoring(elements, rainbow = false) {
    elements.forEach(function(item) {
        item.onmouseover = function() {
            if (!rainbow) {
                item.style.backgroundColor = INITIAL_COLOR;
            } else {
                item.style.backgroundColor = generateRandomColor();
            }
        };
    })
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function runRainbow(grid, button) {
    if (button.textContent.toLowerCase() === "rainbow".toLowerCase()) {
        addMouseOverColoring(grid, true);
        changeRainbowButtonText(button, true);
    } else {
        addMouseOverColoring(grid, false);
        changeRainbowButtonText(button, false);
    }
}

function changeRainbowButtonText(button, rainbow) {
    if (rainbow) {
        button.textContent = 'Black';
    } else {
        button.textContent = 'rainbow';
    }
}

function createGridRow(rowNumber, size) {
    const gridRow = document.createElement('div');
    gridRow.id = 'grid-row-' + rowNumber;
    gridRow.className = 'grid-row';
    gridRow.style = 'height: calc(((42rem - 14px) /' + size + '));'
    return gridRow;
}

function createGridRowItem(rowNr, itemRowNr) {
    const gridRowItem = document.createElement('div');
    gridRowItem.id = `grid-row-${rowNr}-rect-${itemRowNr}`;
    gridRowItem.className = 'grid-rectangle';
    return gridRowItem;
}

function createNewUserGrid() {
    let userGridSize = Number(prompt('Please write your wished grid size: '));
    while (userGridSize === NaN) {
        userGridSize = prompt('Please write your wished grid size: ');
    };
    removeOldGrid();
    runGridDrawing(userGridSize, gridWrapper);
    runRainbow(gridItems, rainbowButton);
}

function removeOldGrid() {
    while (gridWrapper.firstChild) {
        gridWrapper.removeChild(gridWrapper.firstChild);
    }
}