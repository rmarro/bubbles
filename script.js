const gameContainer = document.getElementById('game-container');
gameContainer.dataset.level = -1;
gameContainer.addEventListener('touchmove', handleTouchmove);
let popAction = document.getElementById('pop-action').value;
let reverseMode = false;

function setPopAction(value) {
    popAction = value;
}

function setReverseMode(value) {
    reverseMode = value;
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

function setShape(value) {
    gameContainer.classList.remove(...['squares','circley-squares']);
    gameContainer.classList.add(value);
}

function initializeGrid (value) {
    if (value === "5") {
        alert('r u ok?')
    }
    gameContainer.innerHTML = '';
    createGrid(gameContainer, value);
}

function restart () {
    const count = document.getElementById('bubble-count').value
    gameContainer.innerHTML = '';
    createGrid(gameContainer, count);
}

function createGrid(parentCell, count=null) {
    count ||= 4;
    const newLevel = parseInt(parentCell.dataset.level) + 1;

    for (let i = 0; i < count; i++) {
        const cell = document.createElement('div');
        cell.classList.add(`bubble-${newLevel}`);
        cell.classList.add('cell');
        cell.dataset.level = newLevel;
        addListeners(cell);
        parentCell.appendChild(cell);
    }
}

function handleTouchmove (event) {
    event.preventDefault()
    const cell = document.elementFromPoint(event.touches[0].clientX, event.touches[0].clientY);
    const level = cell.dataset.level;
    if (!cell.classList.contains(`bubble-${level}`) || popAction != 'mouseover') {
        return
    }

    if (reverseMode && popAction === 'mouseover') {
        reverseCell(cell);
    } else {
        convertCellToGrid(cell);
    }
}

function handleCellInteraction (event) {
    if (event.type != popAction) {
        return
    }

    const cell = event.target;

    if (reverseMode) {
        event.stopPropagation()
        reverseCell(cell);
    } else {
        convertCellToGrid(cell);
    }
}

function convertCellToGrid (cell) {
    const level = cell.dataset.level;
    if (level === '6') {
        return
    }

    removeListeners(cell);
    cell.classList.remove(`bubble-${level}`);
    createGrid(cell);
}

function reverseCell(cell) {
    if (cell.dataset.level === '0') {
        return
    }
    parentCell = cell.parentElement;

    let hasGrandchildren = false
    for (const child of parentCell.children) {
        if (child.hasChildNodes()) {
            hasGrandchildren = true
        }
    }
    if (popAction === 'mouseover' && hasGrandchildren) {
        return
    }

    parentCell.innerHTML = '';
    parentCell.classList.add(`bubble-${parentCell.dataset.level}`);
    addListeners(parentCell);
}

function removeListeners(cell) {
    cell.removeEventListener('click', handleCellInteraction);
    cell.removeEventListener('mouseover', handleCellInteraction);
}
function addListeners(cell) {
    cell.addEventListener('click', handleCellInteraction);
    cell.addEventListener('mouseover', handleCellInteraction);
}

initializeGrid(1)
setStyle("rainbow")
