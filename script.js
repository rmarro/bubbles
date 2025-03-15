const gameContainer = document.getElementById('game-container');
gameContainer.dataset.level = 0;

function setStyle(classes) {
    const classesArray = classes.split(" ")
    gameContainer.classList.remove(...['filled','rainbow','earth','air','fire','water'])
    gameContainer.classList.add(...classesArray)
}

function initializeGrid (value) {
    gameContainer.innerHTML = ''
    createGrid(gameContainer, value);
}

function createGrid(parentCell, rows=null) {
    rows ||= 2
    const newLevel = parseInt(parentCell.dataset.level) + 1

    for (let i = 0; i < rows * 2; i++) {
        const cell = document.createElement('div');
        cell.classList.add(`bubble-${newLevel}`);
        cell.classList.add('cell');
        cell.dataset.level = newLevel;
        cell.addEventListener('click', handleCellClick);
        parentCell.appendChild(cell);
    }
}

function handleCellClick (event) {
    const cell = event.target;
    const level = cell.dataset.level;

    if (level === '6') {
        return
    }

    cell.classList.remove(`bubble-${level}`);
    cell.removeEventListener('click', handleCellClick)
    createGrid(cell)
}

createGrid(gameContainer, 2)
setStyle("rainbow")
