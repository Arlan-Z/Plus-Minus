export class AdaptiveStrategyModel {
    myIndex = 0;
    rivalIndex
    lastRivalAns = null;
    rivalNoCnt = 0;
    rivalYesCnt = 0;

    decide(index) {
        this.myIndex = index;
        this.myIndex == 1 ? this.rivalIndex = 2 : this.rivalIndex = 1;
        return this.think();
    }

    think() {
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
        if (gameData == null) return true;

        let lastRound = Object.keys(gameData).length;
        if (gameData[lastRound]["round_remains"] == 1) return false;

        this.lastRivalAns = gameData[lastRound][`plr_${this.rivalIndex}`];

        !this.lastRivalAns ? this.rivalNoCnt++ : this.rivalYesCnt++;

        let totalRounds = this.rivalNoCnt + this.rivalYesCnt;

        // If the opponent is mostly cooperative (Yes)
        if (this.rivalYesCnt / totalRounds > 0.6) {
            // More likely to cooperate
            return true;
        } else if (this.rivalNoCnt / totalRounds > 0.6) {
            // If opponent is mostly not cooperative (No)
            return false;
        } else {
            // If the opponent is balanced in answers, make a decision based on past experience
            if (this.lastRivalAns) {
                return true;
            } else {
                return false;
            }
        }
    }
}
// Made by GPT-4o