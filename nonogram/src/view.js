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
  const aspectRatio = container.dataset.aspectRatio.split(":").map((str) =>
    parseInt(str, 10)
  );
  const rowClues = decodeClues(container.dataset.rowClues);
  const columnClues = decodeClues(container.dataset.columnClues);
  const rowCluesSize = parseInt(container.dataset.rowCluesSize, 10);
  const columnCluesSize = parseInt(container.dataset.columnCluesSize, 10);

  createRoot(container)
    .render(
      <GameView
        aspectRatio={aspectRatio}
        rowClues={rowClues}
        columnClues={columnClues}
        rowCluesSize={rowCluesSize}
        columnCluesSize={columnCluesSize}
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
