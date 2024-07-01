export class RiskyModel{
    risk = Math.random() * 0.2 + 0.75;

    plrYesCnt = 0;
    plrNoCnt = 0;


    
    decide(){
        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true

        for(const roundNumber in gameData){
            if(gameData[roundNumber]["plr"] == false){
                this.plrNoCnt++;
            }
            else this.plrYesCnt++;
        }
        let randomNum = Math.random();

        let allcnt = this.plrNoCnt + this.plrYesCnt;

        let yesChance = this.plrYesCnt/allcnt;
        let noChance = this.plrNoCnt/allcnt;

        if(yesChance >= noChance) return !(this.risk > randomNum);
        return false;
    }
}