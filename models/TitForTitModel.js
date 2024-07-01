export class TitForTit{
    decide(){
        return this.think();
    }

    think(){    
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true
        
        let lastRoundNumber = 0;

        for(const roundNumber in gameData){
            const roundNum = parseInt(roundNumber); 
            if (roundNum > lastRoundNumber) {
                lastRoundNumber = roundNum;
            }
        }

        return gameData[lastRoundNumber]["plr"]
    }
}