import { ModelManager } from "./modelManager.js";

const compScoreText = document.getElementById("computer-score");
const plrScoreText = document.getElementById("player-score");

const plrTable = document.getElementById("player-table"),
    compTable = document.getElementById("computer-table");

const info = document.getElementById('info');

let roundCircles;

let plrTwoScore = 0, plrOneScore = 0;

const plrOneBtnNo = document.getElementById("plr-no"),
    plrOneBtnYes = document.getElementById("plr-yes");

const plrTwoBtnNo = document.getElementById("comp-no"),
    plrTwoBtnYes = document.getElementById("comp-yes");

const clickSnd = new Audio('./sounds/click.wav');

const ROUNDS_COUNT = 10;
const IS_HUMAN = true;

let model_1,model_2;

let plrOneAns = null,
    plrTwoAns = null;

let data;

let roundNumber = 0;

gameSet();

async function newRound(){
    updateUI();
    if(roundNumber >= ROUNDS_COUNT) {
        gameOver();
        return;
    }
    roundNumber ++;
    plrOneAns = null,
    plrTwoAns = null;

    plrTwoBtnNo.disabled = true;
    plrTwoBtnYes.disabled = true;

    if(IS_HUMAN){
        plrOneBtnNo.disabled = false;
        plrOneBtnYes.disabled = false;
    }
    else{
        plrOneBtnNo.disabled = true;
        plrOneBtnYes.disabled = true;

        botTurn(1);

    }
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
    if(plrOneAns != null) return;
    if(ans){
        plrOneBtnNo.disabled = true;
    }
    else{
        plrOneBtnYes.disabled = true;
    }

    plrOneAns = ans;
    botTurn(2);
}

async function botTurn(index){
    await sleep(800);
    
    if(index == 2){
        plrTwoAns = await model_2.getDecision(2);

        if(plrTwoAns){
            plrTwoBtnYes.disabled = false;
        }
        else{
            plrTwoBtnNo.disabled = false;
        }

        results();
    }
    else{
        plrOneAns = await model_1.getDecision(1);

        if(plrOneAns){
            plrOneBtnYes.disabled = false;
        }
        else{
            plrOneBtnNo.disabled = false;
        }

        botTurn(2);
    }
}

async function results(){
    await sleep(1000);

    if(plrTwoAns && plrOneAns) {
        plrTwoScore += 3;
        plrOneScore += 3;
    }
    else if(!plrTwoAns && plrOneAns){
        plrTwoScore += 5;
    }
    else if(plrTwoAns && !plrOneAns){
        plrOneScore += 5;
    }
    else{
        plrTwoScore += 1;
        plrOneScore += 1;
    }
    updateScores();

    return;
}

async function updateScores(){
    if(plrTwoScore < 0) plrTwoScore = 0;
    if(plrOneScore < 0) plrOneScore = 0;

    counter(compScoreText, plrTwoScore);
    counter(plrScoreText, plrOneScore);
    
    saveResults();
    await sleep(500);
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
    }, 400);
}

function gameSet(){
    model_2 = new ModelManager();
    // model_2.setModel(18);
    if(!IS_HUMAN) model_1 = new ModelManager();
    roundNumber = 0;
    data = {};
    localStorage.clear();

    plrOneBtnYes.addEventListener('click', () => choice(true));
    plrOneBtnNo.addEventListener('click', () => choice(false));

    createRoundCircles()
    newRound();
}

function saveResults(){
    data[roundNumber] = {
        plr_1: plrOneAns,
        plr_2: plrTwoAns,
        plr_1_score: plrOneScore,
        plr_2_score: plrTwoScore,
        round_remains: (ROUNDS_COUNT - roundNumber)
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

async function gameOver(){
    plrOneBtnNo.disabled = true;
    plrOneBtnYes.disabled = true;

    plrTwoBtnNo.disabled = true;
    plrTwoBtnYes.disabled = true;
    await sleep(500);

    console.log(model_2.currentModel)
    if(!IS_HUMAN) console.log(model_1.currentModel)

    if(plrOneScore == plrTwoScore) {
        plrTable.classList.add('draw');
        compTable.classList.add('draw');
        return;
    }
    let isPlrWin = plrOneScore > plrTwoScore;
    
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
