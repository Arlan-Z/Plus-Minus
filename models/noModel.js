export class NoModel{
    decide(){
        return this.think();
    }

    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return false
        
        let lastRoundNumber = 0;

        for(const roundNumber in gameData){
            if (roundNumber > lastRoundNumber) {
                lastRoundNumber = roundNumber;
            }
        }

        return lastRoundNumber % 2 == 0;
    }
}
