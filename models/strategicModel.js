export class StrategyModel{
    myIndex = 0;
    rivalIndex = 0;

    lastRivalAns;

    rivalNoCnt = 0; 
    rivalYesCnt = 0;

    risk = 0;
    allRounds = -1;

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
        
        if(this.allRounds == -1) this.allRounds = lastRound + gameData[lastRound]["round_remains"];
        
        this.risk += 1 / (this.allRounds - lastRound);
        if(this.rivalNoCnt > this.rivalYesCnt) this.risk += 0.1
        else this.risk -= 0.15;

        this.lastRivalAns = gameData[lastRound][`plr_${this.rivalIndex}`];

        !this.lastRivalAns ?  this.rivalNoCnt++ : this.rivalYesCnt++;

        if(this.risk > Math.random()) {
            this.risk /= 2;
            return false;
        }


        if(!this.lastRivalAns) return false;

        return true;
    }
}