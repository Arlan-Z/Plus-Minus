export class ForgivingModel{
    myIndex = 0;
    rivalIndex = 0;

    isTrusted = true;
    rivalLastAns = true

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true;

        if(!this.isTrusted) return false;

        let lastRound = Object.keys(gameData).length;   
        let ansBuf = gameData[lastRound][`plr_${this.rivalIndex}`];

        if(!(this.rivalLastAns || ansBuf)) this.isTrusted = false;
        this.rivalLastAns = ansBuf

        return this.isTrusted;
    }

}