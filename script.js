const gameContainer = document.getElementById('game-container');
gameContainer.dataset.level = 0;

function createGrid(parentCell) {
    const newLevel = parseInt(parentCell.dataset.level) + 1

    for (let i = 0; i < 4; i++) {
        const cell = document.createElement('div');
        cell.classList.add(`bubble-${newLevel}`);
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

createGrid(gameContainer)
