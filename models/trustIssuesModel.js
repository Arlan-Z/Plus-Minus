export class TrustIssuesModel{
    answer = true;

    decide(){
        this.think()
        return this.answer
    }

    think(){
        if(!this.answer) return;
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true

        for(const roundNumber in gameData){
            if(gameData[roundNumber]["plr"] == false){
                this.answer = false
                return
            }
        }

    }
}