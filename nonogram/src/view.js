import { Circle, Layer, Stage } from "konva";
import { calcLayout } from "./lib/calcLayout";
import { Game } from "../../src/Game";
import { GameView } from "./Components/GameView";
import { createRoot } from "react-dom/client";

/**
 * @param {HTMLDivElement} container
 * @returns {void}
 */
function init(container) {
  const rowClues = decodeClues(container.dataset.rowClues);
  const columnClues = decodeClues(container.dataset.columnClues);

  const layout = calcLayout(
    container.clientWidth,
    container.clientHeight,
    100,
    100,
    rowClues.length,
    columnClues.length,
  );

  createRoot(container)
    .render(
      <GameView
        rowClues={rowClues}
        columnClues={columnClues}
        layout={layout}
      />,
    );
}

/**
 * @param {string} cluesStr
 * @returns {number[][]}
 */
function decodeClues(cluesStr) {
  return cluesStr
    .split(";")
    .map((clues) => clues.split(",").map((clue) => parseInt(clue, 10)));
}

{
  document
    .querySelectorAll(".wp-block-todays-mitsui-nonogram")
    .forEach((container) => init(container));
}
