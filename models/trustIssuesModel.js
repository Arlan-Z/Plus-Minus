export class TrustIssuesModel{
    answer = true;
    
    myIndex = 0;
    rivalIndex = 0;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        this.think()
        return this.answer
    }

    think(){
        if(!this.answer) return;
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return true

        for(const roundNumber in gameData){
            if(gameData[roundNumber][`plr_${this.rivalIndex}`] == false){
                this.answer = false
                return
            }
        }

    }
}