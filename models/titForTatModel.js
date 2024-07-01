export class TitForTatModel{
    decide(){
        return this.think();
    }

    think(){    
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true
        
        let lastRoundNumber = 0;

        for(const roundNumber in gameData){
            if (roundNumber > lastRoundNumber) {
                lastRoundNumber = roundNumber;
            }
        }

        return gameData[lastRoundNumber]["plr"]
    }
}