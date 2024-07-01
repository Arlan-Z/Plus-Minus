export class RiskyModel{
    risk = Math.random() * 0.2 + 0.75;

    plrYesCnt = 0;
    plrNoCnt = 0;

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

        gameData[lastRound][`plr_${this.rivalIndex}`] === false ?  this.plrNoCnt++ : this.plrYesCnt++;

        let allcnt = this.plrNoCnt + this.plrYesCnt;

        let yesChance = this.plrYesCnt/allcnt;
        let noChance = this.plrNoCnt/allcnt;

        if(yesChance >= noChance) return !(this.risk > randomNum);
        return false;
    }
}