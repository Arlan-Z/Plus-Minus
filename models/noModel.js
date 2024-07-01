export class NoModel{
    myIndex = 0;
    rivalIndex = 0;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return false
        
        let lastRoundNumber = Object.keys(gameData).length;

        return lastRoundNumber % 2 == 0;
    }
}
