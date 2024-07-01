import { modelManager } from "./modelManager.js";

const compScoreText = document.getElementById("computer-score");
const plrScoreText = document.getElementById("player-score");

let compScore = 0, plrScore = 0;

const plrBtnNo = document.getElementById("plr-no"),
    plrBtnYes = document.getElementById("plr-yes");

const compBtnNo = document.getElementById("comp-no"),
    compBtnYes = document.getElementById("comp-yes");

const clickSnd = new Audio('./sounds/click.wav');

let playerAns = null,
    compAns = null;



gameSet();

function startGame(){
    playerAns = null,
    compAns = null;

    compBtnNo.disabled = true;
    compBtnYes.disabled = true;

    plrBtnNo.disabled = false;
    plrBtnYes.disabled = false;
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
    compAns = modelManager.getDecision();
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
        compScore += 2;
        plrScore += 2;
    }
    else if(!compAns && playerAns){
        compScore += 4;
        plrScore -= 2;
    }
    else if(compAns && !playerAns){
        plrScore += 4;
        compScore -= 2;
    }
    else{
        compScore -= 2;
        plrScore -= 2;
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
    
    setTimeout(startGame, 1000);
}

function counter(scoreText, finalScore, duration = 1500) {
    let current = parseInt(scoreText.textContent);
    let range = finalScore - current;

    if (range === 0) return;

    let increment = finalScore > current ? 1 : -1;
    let step = Math.abs(Math.floor(duration / range));

    if (step === 0) {
        step = 1;
    }

    let timer = setInterval(() => {
        current += increment;
        scoreText.textContent = current;
        clickSnd.play();

        if (current === finalScore) {
            clearInterval(timer);
        }
    }, step);
}

function gameSet(){
    modelManager.setModel('random');
    plrBtnYes.addEventListener('click', () => choice(true));
    plrBtnNo.addEventListener('click', () => choice(false));

    startGame();
}