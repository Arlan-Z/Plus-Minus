import { gameInstance } from "../script.js";
export class ThiefModel{
    myIndex = 0;
    rivalIndex = 0;
    mood = 0.8;

    rivalScore = 0;

    myLastAns;
    rivalLastAns;

    constructor(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;
        this.moodIndicator = document.getElementById(`face-indicator-plr-${this.myIndex}`);
        this.moodIndicator.hidden = false;

        this.updateMood();
    }

    async decide(){
        let myAns = await this.think();
        return myAns;
    }
    
    async think(){    
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true

        let lastRound = Object.keys(gameData).length;

        this.rivalPnts = gameData[lastRound][`plr_${this.rivalIndex}_score`];

        this.rivalLastAns = gameData[lastRound][`plr_${this.rivalIndex}`];
        this.myLastAns = gameData[lastRound][`plr_${this.myIndex}`];
        
        if(this.mood < 0.5 && ((1 - this.mood)) > Math.random()) await this.specialTurn()
            else this.calculateMood();

        this.updateMood();
        return lastRound % 2 == 0 && Math.random() > 0.1;
    }

    updateMood() {
        if (this.mood > 1) this.mood = 1;
        if (this.mood < 0) this.mood = 0;
    
        const moodImageMap = {
            0.75: "./images/faces/happy.png",
            0.5: "./images/faces/neutral.png",
            0.25: "./images/faces/sad.png",
            0: "./images/faces/angry.png"
        };
    
        let moodImage;
        if (this.mood >= 0.75) {
            moodImage = moodImageMap[0.75];
        } else if (this.mood >= 0.5) {
            moodImage = moodImageMap[0.5];
        } else if (this.mood >= 0.25) {
            moodImage = moodImageMap[0.25];
        } else {
            moodImage = moodImageMap[0];
        }
    
        this.moodIndicator.style.backgroundImage = `url(${moodImage})`;
        this.moodIndicator.style.backgroundColor = this.getColorFromMood(this.mood);
    }

    getColorFromMood(mood) {
        const happyColor = [0, 128, 0]; // green
        const neutralColor = [255, 255, 0]; // yellow
        const sadColor = [0, 191, 255]; // blue
        const angryColor = [255, 0, 0]; // red
    
        let color;
        if (mood >= 0.75) {
            color = happyColor;
        } else if (mood >= 0.5) {
            const t = (mood - 0.5) / 0.25;
            color = this.interpolateColor(neutralColor, happyColor, t);
        } else if (mood >= 0.25) {
            const t = (mood - 0.25) / 0.25;
            color = this.interpolateColor(sadColor, neutralColor, t);
        } else {
            const t = mood / 0.25;
            color = this.interpolateColor(angryColor, sadColor, t);
        }
        return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    }
    
    interpolateColor(color1, color2, factor) {
        const result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - result[i]));
        }
        return result;
    }

    async specialTurn(){
        let stealPnts = this.rivalPnts;
        await gameInstance.changePlayerScoreByIndex(this.rivalIndex, -stealPnts)
        await gameInstance.changePlayerScoreByIndex(this.myIndex, stealPnts)
        this.mood += 0.5;
    }

    calculateMood(){
        if(this.myLastAns && this.rivalLastAns){
            this.mood += 0.15;
            return;
        }

        if(!this.myLastAns && this.rivalLastAns){
            this.mood += 0.3;
            return;
        }

        if(this.myLastAns && !this.rivalLastAns){
            this.mood -= 0.25;
            return;
        }

        this.mood -= 0.1;
        return;
    }
}