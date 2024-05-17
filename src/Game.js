const { Board } = require("./Board");

class Game {
  /**
   * @param {number[][]} rowClues
   * @param {number[][]} columnClues
   */
  constructor(rowClues, columnClues) {
    this._rowClues = rowClues;
    this._columnClues = columnClues;
    this._board = new Board(columnClues.length, rowClues.length);
  }

  /**
   * @returns {Board}
   */
  get board() {
    return this._board;
  }

  set board(_value) {
    throw new Error("Cannot set board");
  }
}
module.exports.Game = Game;
