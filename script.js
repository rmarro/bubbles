const gameContainer = document.getElementById('game-container');
gameContainer.dataset.level = -1;
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

function handleCellInteraction (event) {
    const cell = event.target;
    const level = cell.dataset.level;
    const ignore = (event.type != popAction);

    if (ignore || level === '6') {
        return
    }

    removeListeners(cell);
    const timeout = (popAction === 'click') ? 0 : 25;

    setTimeout(() => {
        cell.classList.remove(`bubble-${level}`);
        createGrid(cell)
    }, timeout);
}

function removeListeners(cell) {
    cell.removeEventListener('click', handleCellInteraction);
    cell.removeEventListener('mouseover', handleCellInteraction);
}

initializeGrid(1)
setStyle("rainbow")
