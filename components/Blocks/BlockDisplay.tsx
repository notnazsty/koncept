import { Stack } from "@mantine/core";
import React, { Dispatch, FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PageBlock } from "../../models/blocks";
import { Page, PageReducerActions } from "../../models/pages";
import BlockWrapper from "./BlockControls/BlockWrapper";
import { DragLayer } from "./BlockControls/DragLayer";
import ImageBlock from "./ImageBlock/ImageBlock";
import ListBlock from "./ListBlock/ListBlock";
import TextBlock from "./TextBlock/TextBlock";

interface BlockDisplayProps {
  blocks: PageBlock[];
  state: Page;
  dispatch: Dispatch<PageReducerActions>;
}

const BlockDisplay: FC<BlockDisplayProps> = ({ blocks, state, dispatch }) => {
  const renderBlock = (block: PageBlock, index: number) => {
    switch (block.blockType) {
      case "Text":
        return (
          <BlockWrapper
            state={state}
            index={index}
            dispatch={dispatch}
            key={block.blockId}
          >
            <TextBlock textBlock={block} index={index} dispatch={dispatch} />
          </BlockWrapper>
        );
      case "Image":
        return (
          <BlockWrapper
            state={state}
            index={index}
            dispatch={dispatch}
            key={block.blockId}
          >
            <ImageBlock imageBlock={block} index={index} dispatch={dispatch} />
          </BlockWrapper>
        );

      case "List":
        return (
          <BlockWrapper
            state={state}
            index={index}
            dispatch={dispatch}
            key={block.blockId}
          >
            <ListBlock listBlock={block} index={index} dispatch={dispatch} />
          </BlockWrapper>
        );

      default:
        break;
    }
  };

  return (
    <Stack sx={{ width: "100%", display: "flex", flexGrow: 1 }} spacing={1}>
      <DndProvider backend={HTML5Backend}>
        {blocks.map((block, i) => renderBlock(block, i))}
      </DndProvider>
    </Stack>
  );
};

export default BlockDisplay;
