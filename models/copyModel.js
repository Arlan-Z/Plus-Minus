export class CopyModel{
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
        if(gameData == null) return Math.random() > 0.5;

        let lastRound = Object.keys(gameData).length;
        gameData[lastRound][`plr_${this.rivalIndex}`] === false ?  this.rivalNoCnt++ : this.rivalYesCnt++;

        let chanceOfYes = this.rivalYesCnt / (this.rivalNoCnt + this.rivalYesCnt);
        
        return Math.random() <= chanceOfYes;
    }
}