class EloCalculator {
   constructor(kFactor = 32) {
      this.kFactor = kFactor;
   }

   calculateChange(playerRating, opponentRating, result) {
      const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
      return Math.round(this.kFactor * (result - expectedScore));
   }
}

module.exports = EloCalculator;