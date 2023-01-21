const defaultColor = '#333333';
const defaultMode = 'color';
const defaultSize = 16;

let currentColor = defaultColor;
let currentMode = defaultMode;
let currentSize = defaultSize;

function createCurrentColor(newColor) {
	currentColor = newColor;
}

function createCurrentMode(newMode) {
	startButton(newMode);
	currentMode = newMode;
}

function createCurrentSize(newSize) {
	currentSize = newSize;
}

const colorSelector = document.getElementById('colorSelector');
const colorButton = document.getElementById('colorButton');
const multiColorButton = document.getElementById('multiColorButton');
const eraserButton = document.getElementById('eraserButton');
const shakeButton = document.getElementById('shakeButton');
const gridValue = document.getElementById('gridValue');
const gridSlider = document.getElementById('gridSlider');
const grid = document.getElementById('grid');

colorSelector.oninput = (e) => createCurrentColor(e.target.value);
colorButton.onclick = () => createCurrentMode('color');
multiColorButton.onclick = () => createCurrentMode('multicolor');
eraserButton.onclick = () => createCurrentMode('eraser');
shakeButton.onclick = () => refreshGrid();
gridSlider.onmousemove = (e) => updateGridSizeValue(e.target.value);
gridSlider.onchange = (e) => changeGridSize(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function changeGridSize(value) {
	createCurrentSize(value);
	updateGridSizeValue(value);
	refreshGrid();
}

function updateGridSizeValue(value) {
	gridValue.innerHTML = `${value} x ${value}`;
}

function refreshGrid() {
	eraseGrid();
	startGrid(currentSize);
}

function eraseGrid() {
	grid.innerHTML = ''
}

function startGrid(size) {
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	for (let i = 0; i < size * size; i++) {
		const gridElement = document.createElement('div');
		gridElement.classList.add('grid-element');
		gridElement.addEventListener('mouseover', changeColor);
		gridElement.addEventListener('mousedown', changeColor);
		grid.appendChild(gridElement);
	}
}

function changeColor(e) {
	if (e.type === 'mouseover' && !mouseDown) return;
	if (currentMode === 'multicolor') {
		const randomR = Math.floor(Math.random() * 256);
		const randomG = Math.floor(Math.random() * 256);
		const randomB = Math.floor(Math.random() * 256);
		e.target.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
	} 	else if (currentMode === 'color') {
	  	e.target.style.backgroundColor = currentColor;
	} 	else if (currentMode === 'eraser') {
	  	e.target.style.backgroundColor = '#fefefe';
	}
}

function startButton(newMode) {
	if (currentMode === 'multicolor') {
		multiColorButton.classList.remove('active');	
	}	else if (currentMode === 'color') {
		colorButton.classList.remove('active');
	}	else if (currentMode === 'eraser') {
		eraserButton.classList.remove('active');
	}

	if (newMode === 'multicolor') {
		multiColorButton.classList.add('active');	
	}	else if (newMode === 'color') {
		colorButton.classList.add('active');
	}	else if (newMode === 'eraser') {
		eraserButton.classList.add('active');
	}
}

window.onload = () => {
	startGrid(defaultSize);
	startButton(defaultMode);
}