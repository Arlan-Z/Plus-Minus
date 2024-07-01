export class StrategyModel{
    myIndex = 0;
    rivalIndex = 0;

    lastRivalAns;

    rivalNoCnt = 0; 
    rivalYesCnt = 0;
    
    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true;

        let lastRound = Object.keys(gameData).length;
        if(gameData[lastRound]["round_remains"] == 1) return false;
        console.log(gameData);
        this.lastRivalAns = gameData[lastRound][`plr_${this.rivalIndex}`];

        !this.lastRivalAns ?  this.rivalNoCnt++ : this.rivalYesCnt++;

        if(!this.lastRivalAns) return false;

        return true;
    }
}