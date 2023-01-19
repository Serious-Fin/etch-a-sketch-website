let DEFAULT_SIZE = 32;
let DEFAULT_MODE = "color";

let mouseDown = false;
let currentDrawMode = DEFAULT_MODE;

function createGrid(size) {
    clearGrid();

    // Select the grid container div
    const gridContainer = document.querySelector("div.grid-container");

    // Calculate width and height of a single grid element
    let itemWidth = parseInt(window.getComputedStyle(gridContainer).width, 10) / size;

    // Loop n^2 times and create an element each time
    let loopTimes = Math.pow(size, 2);

    for (let i = 0; i < loopTimes; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-item');
        gridElement.setAttribute('draggable', false);
        gridElement.style.width = `${itemWidth}px`;
        gridElement.addEventListener('mouseover', changeColor);
        gridElement.addEventListener('mousedown', changeColor);
        gridContainer.appendChild(gridElement);
    }
}

function clearGrid() {
    const gridContainer = document.querySelector("div.grid-container");
    gridContainer.innerHTML = "";
    console.log(gridContainer);
}

function removeColors() {
    const allNodes = document.querySelectorAll(".grid-container > .grid-item");

    allNodes.forEach((node) => {
        node.style.backgroundColor = "white";
    });
}

function changeColor(event) {
    if (event.type === 'mouseover' && !mouseDown) return;

    if (currentDrawMode === 'color') {
        const colorPicker = document.querySelector("#drawColor");
        this.style.backgroundColor = colorPicker.value;
    }
    else if (currentDrawMode === 'rainbow') {
        let randomColor = `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`;
        this.style.backgroundColor = randomColor;
    }
    
}

function changeMode(newMode) {
    currentDrawMode = newMode;
    console.log(currentDrawMode);
}

document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

// Add event listener to slider
const rangeSlider = document.querySelector("#rangeSlider");
rangeSlider.addEventListener('change', () => {
    let value = rangeSlider.value;
    createGrid(value);
});


window.onload = () => {
    createGrid(DEFAULT_SIZE);
}
