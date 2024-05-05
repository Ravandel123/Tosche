/**
 * Class representing an Elo rating calculator.
 * @class
 */
class EloCalculator {
   /**
    * Creates an instance of EloCalculator.
    * @param {number} [kFactor=32] - The K-factor used in Elo rating calculations,
    * which determines the maximum possible change in rating.
    */
   constructor(kFactor = 32) {
      this.kFactor = kFactor;
   }

   /**
    * Calculates the rating change (delta) for a match.
    * @param {number} playerRating - The current Elo rating of the player.
    * @param {number} opponentRating - The current Elo rating of the opponent.
    * @param {number} result - The result of the match from the perspective of the player
    *                          (1 for a win, 0.5 for a draw, 0 for a loss).
    * @returns {number} The change in rating to be applied.
    */
   calculateChange(playerRating, opponentRating, result) {
      const expectedScore = 1 / (1 + Math.pow(10, (opponentRating - playerRating) / 400));
      return Math.round(this.kFactor * (result - expectedScore));
   }
}

module.exports = EloCalculator;