import { gameInstance } from "../scripts/script.js";
export class OracleModel{
    myIndex = 0;
    rivalIndex = 0;
    mood = 0.8;

    rivalScore = 0;

    canReadMind = false;
    rivalLastAns;

    lastRound = 0;
    gameData;

    constructor(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;
        this.moodIndicator = document.getElementById(`face-indicator-plr-${this.myIndex}`);
        this.moodIndicator.hidden = false;

        this.updateMood();
    }

    async decide(){
        this.updateMood();
        this.myLastAns = await this.think();
        return this.myLastAns;
    }
    
    async think(){    
       this.gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(this.gameData == null) return true

        this.lastRound = Object.keys(this.gameData).length;

        this.rivalLastAns = this.gameData[this.lastRound][`plr_${this.rivalIndex}`];
        
        if(this.canReadMind) return await this.specialTurn();
            else this.calculateMood();

        return this.rivalLastAns;
    }

    updateMood() { 
        const moodImageMap = {
            0.75: "./images/faces/happy.png",
            0.5: "./images/faces/neutral.png",
            0.25: "./images/faces/brain.png",
        };
        
        let color;
        let moodImage;
        if (this.mood > 0.75) {
            moodImage = moodImageMap[0.75];
            color = "green"

        } else if (this.mood > 0.5) {
            moodImage = moodImageMap[0.5];
            color = "yellow"
        } else{
            moodImage = moodImageMap[0.25];
            color = "rgba(255, 0, 166, 0.368)"
            this.canReadMind = true;
        }

        this.moodIndicator.style.backgroundImage = `url(${moodImage})`;
        this.moodIndicator.style.backgroundColor = color;
    }

    calculateMood(){
        if(this.rivalLastAns){
            return;
        }
        this.mood -= 0.25;
    }

    specialTurn(){
        let rivalAns = gameInstance.getPlayerAnswerByIndex(this.rivalIndex);
        let myPnts = this.gameData[this.lastRound][`plr_${this.myIndex}_score`];
        let rivalPnts = this.gameData[this.lastRound][`plr_${this.rivalIndex}_score`];

        if( rivalAns && (myPnts >= rivalPnts)) return true;
        return false
    }
}