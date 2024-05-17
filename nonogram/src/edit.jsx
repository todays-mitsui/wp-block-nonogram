import { __ } from "@wordpress/i18n";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import React from "react";
import { Board } from "../../src/Board";
import { BoardSize } from "./Controls/BoardSize";
import { BoardView } from "./Components/BoardView";
import { calcLayout } from "./lib/calcLayout";
import { useBlockWidth } from "./lib/useBlockWidth";
import "./editor.scss";

const ASPECT_RATIO = 2 / 3;

/**
 * @return {JSX.Element}
 */
export function Edit({ attributes, setAttributes }) {
  /** @type {{ boardData: string }} */
  const { boardData } = attributes;

  const board = boardData == null
    ? new Board(15, 15)
    : Board.deserialize(boardData);

  const [wrapperRef, width] = useBlockWidth();
  const height = width && width * ASPECT_RATIO;

  const [cluesWidth, cluesHeight] = [100, 100];
  const { offsetLeft, offsetTop, cellSize } = calcLayout(
    width,
    height,
    cluesWidth,
    cluesHeight,
    board.numRows,
    board.numColumns,
  );

  return (
    <div {...useBlockProps()}>
      <div ref={wrapperRef}>
        <InspectorControls key="settings">
          <BoardSize
            board={board}
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
