export class RiskyModel{
    risk = Math.random() * 0.2 + 0.75;

    rivalYesCnt = 0;
    rivalNoCnt = 0;

    myIndex = 0;
    rivalIndex = 0;
    
    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        let randomNum = Math.random();
        if(gameData == null) return randomNum < this.risk;  
        let lastRound = Object.keys(gameData).length;

        gameData[lastRound][`plr_${this.rivalIndex}`] === false ?  this.rivalNoCnt++ : this.rivalYesCnt++;

        let allcnt = this.rivalNoCnt + this.rivalYesCnt;

        let yesChance = this.rivalYesCnt/allcnt;
        let noChance = this.rivalNoCnt/allcnt;

        if(yesChance >= noChance) return !(this.risk > randomNum);
        return false;
    }
}