export class GemmaModel {
    myIndex = 0;
    rivalIndex = 0;

    lastRivalAns = null;
    rivalNoCnt = 0;
    rivalYesCnt = 0;

    decide(index) {
        this.myIndex = index;
        this.rivalIndex = this.myIndex === 1 ? 2 : 1;

        return this.think();
    }

    think() {
        // Get game data from localStorage
        let gameData = JSON.parse(localStorage.getItem("gameData")) || {};

        // Analyze opponent's behavior
        if (Object.keys(gameData).length > 0) {
            let lastRound = Object.keys(gameData).length;
            this.lastRivalAns = gameData[lastRound][`plr_${this.rivalIndex}`];

            !this.lastRivalAns ? this.rivalNoCnt++ : this.rivalYesCnt++;
        }

        // Early game strategy: Be unpredictable
        if (Object.keys(gameData).length < 2) {
            return Math.random() < 0.5; // 50% chance of yes or no
        }

        // Adapt based on opponent's tendencies
        if (this.rivalNoCnt > this.rivalYesCnt * 1.5) {
            // Opponent tends to say "no" more often
            return true; // Increase chances of winning by saying "yes"
        } else if (this.rivalYesCnt > this.rivalNoCnt * 1.5) {
            // Opponent tends to say "yes" more often
            return false; // Increase chances of winning by saying "no"
        } else {
            // No clear tendency, stick with a balanced approach
            return Math.random() < 0.5;
        }
    }
}

// model by Gemma-2