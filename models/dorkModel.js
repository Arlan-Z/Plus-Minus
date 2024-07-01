export class DorkModel{
    myIndex = 0;
    rivalIndex = 0;

    myPnts = 0;
    rivalPnts = 0;

    rivalNoCnt = 0; 
    rivalYesCnt = 0;

    rivalLastAns;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return Math.random() > 0.75;

        let lastRound = Object.keys(gameData).length;
        
        if(gameData[lastRound]["round_remains"] == 1) return false;

        this.myPnts = gameData[lastRound][`plr_${this.myIndex}_score`]
        this.rivalPnts = gameData[lastRound][`plr_${this.rivalIndex}_score`]

        if(this.myPnts > this.rivalPnts) return false;

        this.rivalLastAns = gameData[lastRound][`plr_${this.rivalIndex}`];
        this.rivalLastAns ?  this.rivalYesCnt++ : this.rivalNoCnt++;

        let chance = this.rivalYesCnt / (this.rivalYesCnt + this.rivalNoCnt)

        if(this.rivalLastAns && (Math.random() < chance)) return false;
        return this.rivalLastAns;
    }
}