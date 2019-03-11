const INITIAL_SIZE = 16;
const INITIAL_COLOR = 'black';
const gridSection = document.getElementById('grid-section');
let rainbow = false;

function createGridWrapper() {
    const gridContainer = document.createElement('div')
    gridContainer.className = 'grid';
    return gridContainer;
}

function createGrid(location, size = INITIAL_SIZE) {
    for (let i = 1; i <= size; i++) {
        let gridRow = createGridRow(i);
        location.appendChild(gridRow);
        for (let j = 1; j <= size; j++) {
            let gridRowItem = createGridRowItem(i, j);
            addMouseOverColoring(gridRowItem, rainbow)
            gridRow.appendChild(gridRowItem);
        }
    }
}

function addMouseOverColoring(element, rainbow, color = INITIAL_COLOR) {
    element.addEventListener('mouseover', function() {
        if (!rainbow) {
            element.style.backgroundColor = color;
        } else {
            element.style.backgroundColor = generateRandomColor();
        }
    });
}

function createGridRow(rowNumber) {
    const gridRow = document.createElement('div');
    gridRow.id = 'grid-row-' + rowNumber;
    gridRow.className = 'grid-row';
    return gridRow;
}

function createGridRowItem(rowNr, itemRowNr) {
    const gridRowItem = document.createElement('div');
    gridRowItem.id = `grid-row-${rowNr}-${itemRowNr}`;
    gridRowItem.className = 'grid-rectangle';
    return gridRowItem;
}

const gridWrapper = createGridWrapper();
gridSection.appendChild(gridWrapper);
createGrid(gridWrapper);