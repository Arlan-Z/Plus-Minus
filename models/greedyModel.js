export class GreedyModel {
    rivalCooperated = false;
    roundCount = 0;
  
    decide(index) {
      this.roundCount++;
      
      // Начало игры - "дружелюбие"
      if (this.roundCount <= 2) {
        return true; // Выбираем "Да"
      }
  
      let gameData = JSON.parse(localStorage.getItem("gameData")) || null;
      if (gameData == null) {
        return true; // Выбираем "Да" по умолчанию
      }
  
      let lastRound = Object.keys(gameData).length;
      let lastRoundData = gameData[lastRound];
  
      // Анализ оппонента
      if (this.roundCount === 3) {
        this.rivalCooperated = lastRoundData[`plr_${3 - index}`]; // true, если оппонент выбрал "Да" в прошлом раунде
      }
  
      // Стратегия жадины
      if (this.rivalCooperated) {
        return false; // Всегда выбираем "Нет", если оппонент склонен к сотрудничеству
      } else {
        // Чередуем "Да" и "Нет" против склонного к предательству
        return this.roundCount % 2 === 0; 
      }
    }
  }

  // model by Gemini-1.5-pro