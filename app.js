// Tom Lai
// This game can be built simpler and cleaner on Angular but I want to build on Javascript to show full concept.

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');
const inviteLink = document.querySelector('#inviteLink');
const copyButton = document.querySelector('.copy-button');

//game constants;
const xSymbol = '✕';
const oSymbol = 'O';

//game variables
var gameStatus = new createGameStatus();

function createGameStatus() {
    this.topLeft = '';
    this.topLeft = '';
    this.topMiddle = '';
    this.topRight = '';
    this.middleLeft = '';
    this.middleMiddle = '';
    this.middleRight = '';
    this.bottomLeft = '';
    this.bottomMiddle = '';
    this.bottomRight = '',
    this.xIsNext = true;
    this.resetEvent = false;
}

let gameIsLive = true;
let winner = '';

const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol;
const handleWinner = (letter) => {
    gameIsLive = false;
    winner = letter;
    if (letter === 'x') {
        statusDiv.innerHTML = `${letterToSymbol(letter)} has won !`;
    }
    else {
        statusDiv.innerHTML = `
        <span>${letterToSymbol(letter)} has won !</span>
        `;
    }
}
//functions
const checkGameStatus = (fetchData) => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //is there a winner?
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[1].classList.add('won');
        cellDivs[2].classList.add('won');
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWinner(middleLeft);
        cellDivs[3].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[5].classList.add('won');
    }
    else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWinner(bottomLeft);
        cellDivs[6].classList.add('won');
        cellDivs[7].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[3].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWinner(topMiddle);
        cellDivs[1].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[7].classList.add('won');
    }
    else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[5].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWinner(topLeft);
        cellDivs[0].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[8].classList.add('won');
    }
    else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWinner(topRight);
        cellDivs[2].classList.add('won');
        cellDivs[4].classList.add('won');
        cellDivs[6].classList.add('won');
    }
    else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive = false;
        statusDiv.innerHTML = ' Game is tied';
    } else {
        if(!fetchData){
            this.gameStatus.xIsNext = !this.gameStatus.xIsNext;
        }
        if (this.gameStatus.xIsNext) {
            statusDiv.innerHTML = `${xSymbol} is next`;
        } else {
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};

//event Handlers
handleReset = (e) => {
    gameStatus = new createGameStatus();
    gameIsLive = true;
    this.gameStatus.xIsNext = true;
    winner = '';
    statusDiv.innerHTML = `${xSymbol} is next`;
    for (const cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }

    if (!urlParams.get('gameId')) {
        updateGameStatus(true);
    }
};

const handleCellClick = (e) => {
    const classList = e.target.classList;

    if (classList[1] === 'x' || classList[1] === 'o' || !gameIsLive) {
        return;
    }

    if (this.gameStatus.xIsNext) {
        e.target.classList.add('x');
        gameStatus[e.target.id] = 'x';
        checkGameStatus();
    }
    else {
        e.target.classList.add('o');
        gameStatus[e.target.id] = 'o';
        checkGameStatus();
    }
    updateGameStatus();
};

//event listeners
resetDiv.addEventListener('click', handleReset);
for (const cellDiv of cellDivs) {
    cellDiv.addEventListener('click', handleCellClick)
}

copyButton.addEventListener('click', copyFunction);
function copyFunction(){
    var copiedText = document.getElementById("inviteLinkInput");
    window.prompt("Copy to clipboard: Ctrl+C, Enter", copiedText.value);

}

function createNewGame() {
    var dataRef = firebase.database().ref('games/' + existingGameId);
    dataRef.set({
        topLeft: '',
        topMiddle: '',
        topRight: '',
        middleLeft: '',
        middleMiddle: '',
        middleRight: '',
        bottomLeft: '',
        bottomMiddle: '',
        bottomRight: '',
        xIsNext: true,
        resetEvent: false
    });
    dataRef.on('value', function (snapshot) {
        if (snapshot.val()) {
            this.gameStatus = snapshot.val();
            this.liveUpdateGame();
        }
    });

}

function updateGameStatus(resetGame = false){
    firebase.database().ref('games/' + existingGameId).set({
        topLeft: this.gameStatus.topLeft,
        topMiddle: this.gameStatus.topMiddle,
        topRight: this.gameStatus.topRight,
        middleLeft: this.gameStatus.middleLeft,
        middleMiddle: this.gameStatus.middleMiddle,
        middleRight: this.gameStatus.middleRight,
        bottomLeft: this.gameStatus.bottomLeft,
        bottomMiddle: this.gameStatus.bottomMiddle,
        bottomRight: this.gameStatus.bottomRight,
        xIsNext: this.gameStatus.xIsNext,
        resetEvent: resetGame
    });
}

function deleteGame() {
    if (!urlParams.get('gameId')) {
        firebase.database().ref('games/' + existingGameId).remove();
    }
}

function liveUpdateGame() {
    if (this.gameStatus) {
        if (this.gameStatus.topLeft)
            cellDivs[0].classList.add(this.gameStatus.topLeft);
        if (this.gameStatus.topMiddle)
            cellDivs[1].classList.add(this.gameStatus.topMiddle);
        if (this.gameStatus.topRight)
            cellDivs[2].classList.add(this.gameStatus.topRight);
        if (this.gameStatus.middleLeft)
            cellDivs[3].classList.add(this.gameStatus.middleLeft);
        if (this.gameStatus.middleMiddle)
            cellDivs[4].classList.add(this.gameStatus.middleMiddle);
        if (this.gameStatus.middleRight)
            cellDivs[5].classList.add(this.gameStatus.middleRight);
        if (this.gameStatus.bottomLeft)
            cellDivs[6].classList.add(this.gameStatus.bottomLeft);
        if (this.gameStatus.bottomMiddle)
            cellDivs[7].classList.add(this.gameStatus.bottomMiddle);
        if (this.gameStatus.bottomRight)
            cellDivs[8].classList.add(this.gameStatus.bottomRight);
        checkGameStatus(true);
    }
}

const urlParams = new URLSearchParams(location.search);
var existingGameId = urlParams.get('gameId');
if (existingGameId) {
    resetDiv.classList.add("hide-button");
    inviteLink.classList.add("hide-button");
    var existingGame = firebase.database().ref('games/' + existingGameId);
    existingGame.on('value', function (snapshot) {
        if (snapshot.val()) {
            this.gameStatus = snapshot.val();
            if(this.gameStatus.resetEvent){
                this.handleReset();
            }else{
                this.liveUpdateGame();
            }            
        }
    });
} else {
    //Database storage for turns
    this.existingGameId = Math.random().toString(36).substring(2, 9);
    this.inviteLink.querySelector("input").value = location.href + "?gameId=" + this.existingGameId;
    createNewGame();
}