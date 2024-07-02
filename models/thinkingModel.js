export class ThinkingModel{
    myIndex = 0;
    rivalIndex = 0;

    rivalAnswers = [];
    myAnswers = [];

    lastRound = 0;

    myThought = "";
    bannedThought = "";

    wasIRight = false;
    startThink = false;

    modelChance ={
        goodModel: 0,
        badModel: 0,
        randomModel: 0,
        fairModel: 0,
    }

    allRoundsCount = 0;
    chanceGap = 1;

    decide(index){
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;

        let myAns = this.think();
        this.myAnswers.push(myAns);

        return myAns;
    }
    
    think(){
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if(gameData == null) return false

        this.lastRound = Object.keys(gameData).length;
        if(gameData[this.lastRound]["round_remains"] == 1) return false;

        if(this.startThink) {
            this.wasIRight = (!this.rivalAnswers[this.lastRound - 1] && this.myAnswers[this.lastRound - 1]);
        }
        else {
            this.wasIRight = true;
        }


        this.rivalAnswers.push(gameData[this.lastRound][`plr_${this.rivalIndex}`]);

        if(this.allRoundsCount == 0) {
            this.allRoundsCount = this.lastRound + gameData[this.lastRound]["round_remains"];

            return true;
        }

        this.calculateChances();

        let model = this.getMostChanceModel();

        return this.adapt(model)

    }

    adapt(model){
        this.myThought = model;
        this.startThink = true;
        switch (model) {
            case 'goodModel':
                return this.goodModelAnswer();
            case 'badModel':
                return this.badModelAnswer();
            case 'randomModel':
                return this.randomModelAnswer()
            case 'fairModel':
                return this.fairModelAnswer();
            default:
                return Math.random() > 0.5;
        }

    }

    getMostChanceModel(){
        if(!this.wasIRight) this.bannedThought = this.myThought;

        const entries = Object.entries(this.modelChance);

        const [maxModel] = entries.reduce((maxEntry, currentEntry) => {
            return (currentEntry[1] > maxEntry[1]) && (currentEntry != this.bannedThought) ? currentEntry : maxEntry;
        });

        return maxModel;
    }

    calculateChances(){
        this.resetChances();
        if(!this.rivalAnswers[0]) this.modelChance.badModel += this.chanceGap

        for(let i = 0; i < this.lastRound - 1; i++){
            if(this.rivalAnswers[i + 1] == this.myAnswers[i]) this.modelChance.fairModel += this.chanceGap;
            else if(this.rivalAnswers[i + 1] && !this.myAnswers[i]) this.modelChance.goodModel += this.chanceGap;
            else if(!this.rivalAnswers[i + 1] && this.myAnswers[i]) this.modelChance.badModel += this.chanceGap;

            this.modelChance.randomModel += (0.5 * this.chanceGap)
        }   
    }

    resetChances(){
        Object.keys(this.modelChance).forEach(key => {
            this.modelChance[key] = 0;
        });
    }

    goodModelAnswer(){  
        return false;
    }
    
    badModelAnswer(){
        return false;
    }

    randomModelAnswer(){
        let yesChance = (this.rivalAnswers.filter((ans) => ans))/this.rivalAnswers.length;

        let randomNum = Math.random();
        
        return !(yesChance > randomNum);
       
    }

    fairModelAnswer(){
        return true;
    }
    
}