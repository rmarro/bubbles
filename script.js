const gameContainer = document.getElementById('game-container');
gameContainer.dataset.level = -1;
gameContainer.addEventListener('touchmove', handleTouchmove);
let popAction = document.getElementById('pop-action').value;

function setPopAction(value) {
    popAction = value;
}

function setStyle(classes) {
    const classesArray = classes.split(" ");
    gameContainer.classList.remove(...['rainbow','spa-1','spa-2','spa-3','spa-4','earth','air','fire','water']);
    gameContainer.classList.add(...classesArray);
}

function setFilled(value) {
    if (value) {
        gameContainer.classList.add('filled');
    } else {
        gameContainer.classList.remove('filled');
    }
}

function initializeGrid (value) {
    if (value === "5") {
        alert('r u ok?')
    }
    gameContainer.innerHTML = '';
    createGrid(gameContainer, value);
}

function createGrid(parentCell, count=null) {
    count ||= 4;
    const newLevel = parseInt(parentCell.dataset.level) + 1;

    for (let i = 0; i < count; i++) {
        const cell = document.createElement('div');
        cell.classList.add(`bubble-${newLevel}`);
        cell.classList.add('cell');
        cell.dataset.level = newLevel;
        cell.addEventListener('click', handleCellInteraction);
        cell.addEventListener('mouseover', handleCellInteraction);
        parentCell.appendChild(cell);
    }
}

function handleTouchmove (event) {
    const cell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
    const level = cell.dataset.level;
    const ignore = !cell.classList.contains(`bubble-${level}`) || popAction != 'mouseover';
    convertCellToGrid (cell, ignore);
}

function handleCellInteraction (event) {
    const cell = event.target;
    const ignore = (event.type != popAction);
    convertCellToGrid (cell, ignore);
}

function convertCellToGrid (cell, ignore) {
    const level = cell.dataset.level;

    if (ignore || level === '6') {
        return
    }

    removeListeners(cell);
    cell.classList.remove(`bubble-${level}`);
    createGrid(cell);
}

function removeListeners(cell) {
    cell.removeEventListener('click', handleCellInteraction);
    cell.removeEventListener('mouseover', handleCellInteraction);
}

initializeGrid(1)
setStyle("rainbow")
