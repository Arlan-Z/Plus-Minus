export class VisibleChanceModel{
    myIndex = 0;
    rivalIndex = 0;

    yesAnsCnt = 0;
    noAnsCnt = 0;
    
    allRoundsCount = 0;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        let ans = this.think();
        ans ? this.yesAnsCnt-- : this.noAnsCnt--;
        return ans;
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if (gameData == null) return Math.random() > 0.5;

        if(this.allRoundsCount == 0) {
            let lastRound = Object.keys(gameData).length;
            this.allRoundsCount = lastRound + gameData[lastRound]["round_remains"];

            this.noAnsCnt += Math.round(this.allRoundsCount / 2);
            this.yesAnsCnt += this.allRoundsCount - this.noAnsCnt;

            return Math.random() > 0.5;
        }

        let yesChance =  this.yesAnsCnt / (this.yesAnsCnt + this.noAnsCnt)
        return yesChance > Math.random();
    }
}