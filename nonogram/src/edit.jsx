import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import React from "react";
import { Board } from "../../src/Board";
import { BoardSize } from "./Controls/BoardSize";
import { BoardView } from "./Components/BoardView";
import { calcLayout } from "./lib/calcLayout";
import { useBlockWidth } from "./lib/useBlockWidth";
import "./editor.scss";

/**
 * @return {JSX.Element}
 */
export function Edit({ attributes, setAttributes }) {
  /**
   * @type {{
   *  aspectRatio: [number, number];
   *  boardData: string;
   * }}
   */
  const { aspectRatio, boardData } = attributes;

  const board = boardData == null
    ? new Board(15, 15)
    : Board.deserialize(boardData);

  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * aspectRatio[1] / aspectRatio[0];

  const maxNumRowClues = Math.max(
    Math.ceil(board.numColumns / 2),
    ...[...board.rowClues()].map((clues) => clues.length),
  );
  const maxNumColumnClues = Math.max(
    Math.ceil(board.numRows / 2),
    ...[...board.columnClues()].map((clues) => clues.length),
  );

  const {
    offsetLeft,
    offsetTop,
    cluesFontSize,
    cluesWidth,
    cluesHeight,
    cellSize,
  } = calcLayout(
    width,
    height,
    maxNumRowClues,
    maxNumColumnClues,
    board.numRows,
    board.numColumns,
  );

  console.log({ cluesWidth, cluesHeight, cellSize });

  return (
    <div {...useBlockProps()}>
      <div ref={wrapperRef}>
        <InspectorControls key="settings">
          <BoardSize
            board={board}
            aspectRatio={aspectRatio}
            setAttributes={setAttributes}
          />
        </InspectorControls>

        <BoardView
          width={width}
          height={height}
          board={board}
          left={offsetLeft}
          top={offsetTop}
          rowClues={[...board.rowClues()]}
          columnClues={[...board.columnClues()]}
          cluesFontSize={cluesFontSize}
          cluesWidth={cluesWidth}
          cluesHeight={cluesHeight}
          cellSize={cellSize}
          setBoardData={(boardData) => setAttributes({ boardData })}
          enableSpaceStatus={false}
        />
      </div>
    </div>
  );
}
