export class FakeTitForTatModel{
    myIndex = 0;
    rivalIndex = 0;

    lastRivalAns;

    myPnts = 0;
    rivalPnts = 0;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }
    
    think(){    
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true

        let lastRoundNumber = Object.keys(gameData).length;

        if(gameData[lastRoundNumber]["round_remains"] == 1) return false;

        this.myPnts = gameData[lastRoundNumber][`plr_${this.myIndex}_score`]
        this.rivalPnts = gameData[lastRoundNumber][`plr_${this.rivalIndex}_score`]
        if(this.myPnts > this.rivalPnts) return false;

        this.lastRivalAns = gameData[lastRoundNumber][`plr_${this.rivalIndex}`];

        let isCheat = Math.random() > 0.1;

        if(this.lastRivalAns) return isCheat;
            else return false;
    }
}