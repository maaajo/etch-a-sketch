"use strict";
const INITIAL_SIZE = 16;
const INITIAL_COLOR = 'black';
const gridSection = document.getElementById('grid-section');
const rainbowButton = document.getElementById('rainbow-btn');
const clearButton = document.getElementById('clear-btn');
let rainbowSelected = false;
let gridItems = '';
let clearContentClicked = 0;
let rainbowClicked = 0;

rainbowButton.addEventListener('click', function() {
    rainbowClicked = 1;
    runRainbow(gridItems, this, rainbowClicked, clearContentClicked);
});

clearButton.addEventListener('click', function() {
    clearContentClicked = 1;
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

function addMouseOverColoring(elements) {
    elements.forEach(function(item) {
        item.onmouseover = function() {
            if (rainbowSelected) {
                item.style.backgroundColor = generateRandomColor();
            } else {
                item.style.backgroundColor = INITIAL_COLOR;
            }
        };
    })
}

function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

function runRainbow(grid, button, rainbowButtonClicked, clearClicked) {
    if (button.textContent.toLowerCase() === "rainbow".toLowerCase() && rainbowButtonClicked) {
        rainbowSelected = true;
        addMouseOverColoring(grid);
        changeRainbowButtonText(button, true);
    } else {
        rainbowSelected = false;
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
    let userGridSize = Number(prompt('Please write your wished grid size(only number from 2 to 100): '));
    while (isNaN(userGridSize) || !userGridSize || userGridSize < 2 || userGridSize > 100) {
        userGridSize = Number(prompt('Err! Please type only numbers from 2 to 100: '));
    }
    removeOldGrid();
    runGridDrawing(userGridSize, gridWrapper);
}

function removeOldGrid() {
    while (gridWrapper.firstChild) {
        gridWrapper.removeChild(gridWrapper.firstChild);
    }
}