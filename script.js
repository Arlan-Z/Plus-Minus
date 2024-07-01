import { modelManager } from "./modelManager.js";

const compScoreText = document.getElementById("computer-score");
const plrScoreText = document.getElementById("player-score");

const plrTable = document.getElementById("player-table"),
    compTable = document.getElementById("computer-table");

const info = document.getElementById('info');

let roundCircles;

let compScore = 0, plrScore = 0;

const plrBtnNo = document.getElementById("plr-no"),
    plrBtnYes = document.getElementById("plr-yes");

const compBtnNo = document.getElementById("comp-no"),
    compBtnYes = document.getElementById("comp-yes");

const clickSnd = new Audio('./sounds/click.wav');

const ROUNDS_COUNT = 5;

let playerAns = null,
    compAns = null;

let data;

let roundNumber = 0;

gameSet();

function newRound(){
    updateUI();
    if(roundNumber >= ROUNDS_COUNT) {
        gameOver();
        return;
    }
    roundNumber ++;
    playerAns = null,
    compAns = null;

    compBtnNo.disabled = true;
    compBtnYes.disabled = true;

    plrBtnNo.disabled = false;
    plrBtnYes.disabled = false;
}

function updateUI(){
    roundCircles.forEach((circle, index) => {
        if (index < roundNumber) {
            circle.classList.add('passed');
        } else {
            circle.classList.remove('passed');
        }
    });
}

function choice(ans){
    if(playerAns != null) return;
    if(ans){
        plrBtnNo.disabled = true;
    }
    else{
        plrBtnYes.disabled = true;
    }

    playerAns = ans;
    botTurn();
}

async function botTurn(){
    await new Promise(resolve => setTimeout(resolve, 800));
    compAns = await modelManager.getDecision();
    if(compAns){
        compBtnYes.disabled = false;
    }
    else{
        compBtnNo.disabled = false;
    }

    results();
}

async function results(){
    await new Promise(resolve => setTimeout(resolve, 1000));

    if(compAns && playerAns) {
        compScore += 3;
        plrScore += 3;
    }
    else if(!compAns && playerAns){
        compScore += 5;
    }
    else if(compAns && !playerAns){
        plrScore += 5;
    }
    else{
        compScore += 1;
        plrScore += 1;
    }
    updateScores();

    return;
}

async function updateScores(){
    if(compScore < 0) compScore = 0;
    if(plrScore < 0) plrScore = 0;

    counter(compScoreText, compScore);
    counter(plrScoreText, plrScore);

    await new Promise(resolve => setTimeout(resolve, 500));
    
    saveResults();
    setTimeout(newRound, 1000);
}

function counter(scoreText, finalScore) {
    let current = parseInt(scoreText.textContent);
    let range = finalScore - current;

    if (range === 0) return;

    let increment = finalScore > current ? 1 : -1;

    let timer = setInterval(() => {
        current += increment;
        scoreText.textContent = current;
        clickSnd.play();

        if (current === finalScore) {
            clearInterval(timer);
        }
    }, 375);
}

function gameSet(){
    roundNumber = 0;
    data = {};
    localStorage.clear();
    // modelManager.setModel(6);
    plrBtnYes.addEventListener('click', () => choice(true));
    plrBtnNo.addEventListener('click', () => choice(false));

    createRoundCircles()
    newRound();
}

function saveResults(){
    data[roundNumber] = {
        comp: compAns,
        plr: playerAns,
        compScore: compScore,
        plrScore: plrScore
    }

    localStorage.setItem("gameData", JSON.stringify(data));
}

function createRoundCircles(){
    for(let i = 0; i < ROUNDS_COUNT; i++){
        let roundCircle = document.createElement('div');
        roundCircle.classList.add('round-circle');
        info.appendChild(roundCircle);
    }

    roundCircles = document.querySelectorAll('.info-container .round-circle');
}

function gameOver(){
    plrBtnNo.disabled = true;
    plrBtnYes.disabled = true;

    compBtnNo.disabled = true;
    compBtnYes.disabled = true;

    if(plrScore == compScore) {
        alert("Draw");
        return;
    }
    let isPlrWin = plrScore > compScore;

    console.log(isPlrWin);
    if(isPlrWin){
        plrTable.classList.add('winner');
        compTable.classList.add('loser');
        return;
    }
    else{
        plrTable.classList.add('loser');
        compTable.classList.add('winner');
        return;
    }
}