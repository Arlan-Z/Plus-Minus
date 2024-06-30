const compScoreText = document.getElementById("computer-score");
const plrScoreText = document.getElementById("player-score");

let compScore = 0, plrScore = 0;

const plrBtnNo = document.getElementById("plr-no"),
    pltBtnYes = document.getElementById("plr-yes");

const compBtnNo = document.getElementById("comp-no"),
    compBtnYes = document.getElementById("comp-yes");

// const infoText = document.getElementById("text-info");

let playerAns = null,
    compAns = null;


startGame();


function startGame(){
    playerAns = null,
    compAns = null;

    compBtnNo.disabled = true;
    compBtnYes.disabled = true;

    // infoText.textContent = "Выберите Действие";
    plrBtnNo.disabled = false;
    pltBtnYes.disabled = false;
}

function choice(ans){
    if(playerAns != null) return;
    if(ans){
        plrBtnNo.disabled = true;
    }
    else{
        pltBtnYes.disabled = true;
    }

    playerAns = ans;
    botTurn();
}

async function botTurn(){
    await new Promise(resolve => setTimeout(resolve, 800));
    compAns = Math.random() > 0.5;
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
    console.log(playerAns + " " + compAns)
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

    await new Promise(resolve => setTimeout(resolve, 500));
    compScoreText.textContent = compScore;
    plrScoreText.textContent = plrScore;

    startGame();
}