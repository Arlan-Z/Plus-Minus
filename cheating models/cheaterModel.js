import { gameInstance } from "../scripts/script.js";
export class CheaterModel{
    myIndex = 0;
    rivalIndex = 0;
    mood = 1;

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
        this.myLastAns = await this.think();
        return this.myLastAns;
    }
    
    async think(){    
       this.gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(this.gameData == null) return Math.random() > 0.1;

        this.lastRound = Object.keys(this.gameData).length;

        this.rivalLastAns = this.gameData[this.lastRound][`plr_${this.rivalIndex}`];
        
        if(this.mood == 0.5) return this.specialTurn();
        this.calculateMood();

        return Math.random() > 0.15;
    }

    updateMood() { 
        const moodImageMap = {
            1: "./images/faces/rest.png",
            0.5: "./images/faces/winking.png",
        };
        
        let color;
        let moodImage;
        if (this.mood > 0.5) {
            moodImage = moodImageMap[1];
            color = "rgb(255, 94, 0)"

        } else{
            moodImage = moodImageMap[0.5];
            color = "rgba(255, 0, 0, 0.687)"
        }

        this.moodIndicator.style.backgroundImage = `url(${moodImage})`;
        this.moodIndicator.style.backgroundColor = color;
    }

    calculateMood(){
        if(!this.rivalLastAns){
            this.mood -= 0.25;
        }
        this.updateMood();
    }

    specialTurn(){
        gameInstance.changePlayerChoiceByIndex(this.rivalIndex);
        return false
    }
}