export class ReactiveModel {
    rivalLastDecision = null;

    decide(index) {
        this.myIndex = index;
        this.rivalIndex = index === 1 ? 2 : 1;

        return this.think();
    }

    think() {
        let gameData = JSON.parse(localStorage.getItem("gameData")) || null;

        if (gameData === null) {
            // Если нет предыдущих данных, принимаем случайное решение
            return Math.random() < 0.5;
        }

        let lastRound = Object.keys(gameData).length;

        if (lastRound > 0) {
            this.rivalLastDecision = gameData[lastRound][`plr_${this.rivalIndex}`];
        }

        // Пример реакции на решение противника
        if (this.rivalLastDecision === false) {
            // Если противник отказался на предыдущем ходу, вероятность согласиться выше
            return Math.random() < 0.7;
        } else {
            // Иначе вероятность отказа выше
            return Math.random() < 0.3;
        }
    }
}

// model by GPT-3.5
