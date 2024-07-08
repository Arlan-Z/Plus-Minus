import { ModelManager } from "./modelManager.js";
export class Game {
    constructor(roundCnt, isHuman) {
        this.plrTwoScoreText = document.getElementById("computer-score");
        this.plrOneScoreText = document.getElementById("player-score");

        this.plrTable = document.getElementById("player-table");
        this.compTable = document.getElementById("computer-table");

        this.info = document.getElementById('info');

        this.roundCircles = [];

        this.plrTwoScore = 0;
        this.plrOneScore = 0;

        this.plrOneBtnNo = document.getElementById("plr-no");
        this.plrOneBtnYes = document.getElementById("plr-yes");

        this.plrTwoBtnNo = document.getElementById("comp-no");
        this.plrTwoBtnYes = document.getElementById("comp-yes");

        this.clickSnd = new Audio('./sounds/click.wav');

        this.ROUNDS_COUNT = roundCnt;
        this.IS_HUMAN = isHuman;

        this.model_1 = null;
        this.model_2 = null;

        this.plrOneAns = null;
        this.plrTwoAns = null;

        this.data = {};

        this.roundNumber = 0;
    }

    async newRound() {
        this.updateUI();
        if (this.roundNumber >= this.ROUNDS_COUNT) {
            this.gameOver();
            return;
        }
        this.roundNumber++;
        this.plrOneAns = null;
        this.plrTwoAns = null;

        this.plrTwoBtnNo.disabled = true;
        this.plrTwoBtnYes.disabled = true;

        if (this.IS_HUMAN) {
            this.plrOneBtnNo.disabled = false;
            this.plrOneBtnYes.disabled = false;
        } else {
            this.plrOneBtnNo.disabled = true;
            this.plrOneBtnYes.disabled = true;

            this.botTurn(1);
        }
    }

    updateUI() {
        this.roundCircles.forEach((circle, index) => {
            if (index < this.roundNumber) {
                circle.classList.add('passed');
            } else {
                circle.classList.remove('passed');
            }
        });
    }

    choice(ans) {
        if (this.plrOneAns != null) return;
        if (ans) {
            this.plrOneBtnNo.disabled = true;
        } else {
            this.plrOneBtnYes.disabled = true;
        }

        this.plrOneAns = ans;
        this.botTurn(2);
    }

    async botTurn(index) {
        await this.sleep(800);

        if (index == 2) {
            this.plrTwoAns = await this.model_2.getDecision(2);

            if (this.plrTwoAns) {
                this.plrTwoBtnYes.disabled = false;
            } else {
                this.plrTwoBtnNo.disabled = false;
            }

            this.results();
        } else {
            this.plrOneAns = await this.model_1.getDecision(1);

            if (this.plrOneAns) {
                this.plrOneBtnYes.disabled = false;
            } else {
                this.plrOneBtnNo.disabled = false;
            }

            this.botTurn(2);
        }
    }

    async results() {
        await this.sleep(1000);

        if (this.plrTwoAns && this.plrOneAns) {
            this.plrTwoScore += 3;
            this.plrOneScore += 3;
        } else if (!this.plrTwoAns && this.plrOneAns) {
            this.plrTwoScore += 5;
        } else if (this.plrTwoAns && !this.plrOneAns) {
            this.plrOneScore += 5;
        } else {
            this.plrTwoScore += 1;
            this.plrOneScore += 1;
        }
        this.updateScores();

        return;
    }

    async updateScores() {
        if (this.plrTwoScore < 0) this.plrTwoScore = 0;
        if (this.plrOneScore < 0) this.plrOneScore = 0;

        this.counter(this.plrTwoScoreText, this.plrTwoScore);
        await this.counter(this.plrOneScoreText, this.plrOneScore);

        this.saveResults();
        setTimeout(() => this.newRound(), 1000);
    }

    counter(scoreText, finalScore) {
        return new Promise((resolve) => {
            let current = parseInt(scoreText.textContent);
            let range = finalScore - current;
    
            if (range === 0) {
                resolve();
                return;
            }
    
            let increment = finalScore > current ? 1 : -1;
    
            let timer = setInterval(() => {
                current += increment;
                scoreText.textContent = current;
                this.clickSnd.play();
    
                if (current === finalScore) {
                    clearInterval(timer);
                    resolve();
                }
            }, 400);
        });
    }

    gameSet() {
        this.model_2 = new ModelManager(2);
        this.model_2.setModel(21);
        if (!this.IS_HUMAN) this.model_1 = new ModelManager(1);
        this.roundNumber = 0;
        this.data = {};
        localStorage.clear();

        this.plrOneBtnYes.addEventListener('click', () => this.choice(true));
        this.plrOneBtnNo.addEventListener('click', () => this.choice(false));

        this.createRoundCircles();
        this.newRound();
    }

    saveResults() {
        this.data[this.roundNumber] = {
            plr_1: this.plrOneAns,
            plr_2: this.plrTwoAns,
            plr_1_score: this.plrOneScore,
            plr_2_score: this.plrTwoScore,
            round_remains: (this.ROUNDS_COUNT - this.roundNumber),
        }

        localStorage.setItem("gameData", JSON.stringify(this.data));
    }

    createRoundCircles() {
        for (let i = 0; i < this.ROUNDS_COUNT; i++) {
            let roundCircle = document.createElement('div');
            roundCircle.classList.add('round-circle');
            this.info.appendChild(roundCircle);
        }

        this.roundCircles = document.querySelectorAll('.info-container .round-circle');
    }

    async gameOver() {
        this.plrOneBtnNo.disabled = true;
        this.plrOneBtnYes.disabled = true;

        this.plrTwoBtnNo.disabled = true;
        this.plrTwoBtnYes.disabled = true;
        await this.sleep(500);

        console.log(this.model_2.currentModel);
        if (!this.IS_HUMAN) console.log(this.model_1.currentModel);

        if (this.plrOneScore === this.plrTwoScore) {
            this.plrTable.classList.add('draw');
            this.compTable.classList.add('draw');
            return;
        }
        const isPlrWin = this.plrOneScore > this.plrTwoScore;

        if (isPlrWin) {
            this.plrTable.classList.add('winner');
            this.compTable.classList.add('loser');
            return;
        } else {
            this.plrTable.classList.add('loser');
            this.compTable.classList.add('winner');
            return;
        }
    }
    
    getPlayerAnswerByIndex(index){
        if(index == 1){
            return  this.IS_HUMAN ? this.plrOneAns : this.model_1.getDecision(1);
        }
        return this.model_2.getDecision(2);
    }

    async changePlayerScoreByIndex(index, cnt) {
        if (index === 1) {
            this.plrOneScore += cnt;
            await this.counter(this.plrOneScoreText, this.plrOneScore);
            return this.plrOneScore;
        } else {
            this.plrTwoScore += cnt;
            await this.counter(this.plrTwoScoreText, this.plrTwoScore);
            return this.plrTwoScore;
        }
    }
    
    async changePlayerChoiceByIndex(index, ans = true){
        if(index === 1){
            this.plrOneAns = ans;

            if (this.plrOneAns) {
                this.plrOneBtnYes.disabled = false;
                this.plrOneBtnNo.disabled = true;
            } else {
                this.plrOneBtnNo.disabled = false;
                this.plrOneBtnYes.disabled = true;
            }
            return;
        }
        else{
            this.plrTwoAns = ans;

            if (this.plrTwoAns) {
                this.plrTwoBtnYes.disabled = false;
                this.plrTwoBtnNo.disabled = true;
            } else {
                this.plrTwoBtnNo.disabled = false;
                this.plrTwoBtnYes.disabled = true;
            }
        }
    }
    

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
