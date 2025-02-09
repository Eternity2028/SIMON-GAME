let gameSeq = [];
let playerSeq = [];
let score = 0;
let gameOn = false;

const Colors = {
    'Uleft': 'red',
    'Uright': 'green',
    'Dleft': 'blue',
    'Dright': 'yellow'
}

const quadrants = {
    Uleft: document.querySelector('.Uleft'),
    Uright: document.querySelector('.Uright'),
    Dleft: document.querySelector('.Dleft'),
    Dright: document.querySelector('.Dright')
}

Object.keys(quadrants).forEach(key => {
    quadrants[key].addEventListener('click', () => ClickHandler(key));
})

function updateScore() {
    document.querySelector('.center').innerHTML = `${score}`;
}

function startGame () {
    gameSeq = [];
    playerSeq = [];
    score = 0;
    gameOn = true;
    nextRound();
}

function nextRound () {
    const quadKeys = Object.keys(Colors);
    const Algo = quadKeys[Math.floor(Math.random()*quadKeys.length)];
    gameSeq.push(Algo);
    playSequence();
    
}

function flash (quadrant) {
    quadrants[quadrant].classList.add('active');

    setTimeout(() => {
        quadrants[quadrant].classList.remove('active');
    }, 500);
}

function playSequence () {
    gameOn = false;

    flash(gameSeq[gameSeq.length - 1]);

    setTimeout(() => {
        gameOn = true;
        playerSeq = []; 
    }, 1000)
}

function checkPlayerInput () {
    for (let i = 0 ; i < playerSeq.length; i++) {
        if (playerSeq[i] !== gameSeq[i]) {
            return false;
        }
    }
    return true;
}

function ClickHandler (quadrant) {
    if (!gameOn) return;

    flash(quadrant);
    playerSeq.push(quadrant);

    if(checkPlayerInput()) {
        if (playerSeq.length === gameSeq.length) {  
            score++;
            updateScore()
            setTimeout(nextRound, 1000);
            }
        
    } 
    else{
        endGame();
    }
}

function endGame () {
    alert(`Game Over! Your Score: ${score}`);
    gameOn = false;
}

updateScore()