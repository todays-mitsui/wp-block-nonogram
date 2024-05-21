import { registerBlockType } from "@wordpress/blocks";
import "./style.scss";
import { Edit } from "./edit";
import { save } from "./save";
import metadata from "./block.json";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  icon: {
    src:
      <svg width="150" height="148" viewBox="0 0 150 148" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="40" y="8" width="96" height="36" fill="#E7E7E7" />
        <rect x="8" y="44" width="32" height="96" fill="#E7E7E7" />
        <rect x="40" y="44" width="96" height="96" fill="white" />
        <line x1="8" y1="73" x2="136" y2="73" stroke="#A5A5A5" stroke-width="6" />
        <line x1="8" y1="105" x2="136" y2="105" stroke="#A5A5A5" stroke-width="6" />
        <line x1="43" y1="8" x2="43" y2="140" stroke="black" stroke-width="6" />
        <line x1="75" y1="8" x2="75" y2="140" stroke="#A5A5A5" stroke-width="6" />
        <line x1="107" y1="8" x2="107" y2="140" stroke="#A5A5A5" stroke-width="6" />
        <line x1="139" y1="8" x2="139" y2="140" stroke="black" stroke-width="6" />
        <line x1="8" y1="41" x2="136" y2="41" stroke="black" stroke-width="6" />
        <line x1="8" y1="137" x2="136" y2="137" stroke="black" stroke-width="6" />
      </svg>
  },
  edit: Edit,
  save,
});
