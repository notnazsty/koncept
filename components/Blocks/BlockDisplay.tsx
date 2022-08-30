import { Stack } from "@mantine/core";
import React, { Dispatch, FC } from "react";
import { PageBlock } from "../../models/blocks";
import { Page, PageReducerActions } from "../../models/pages";
import BlockWrapper from "./BlockControls/BlockWrapper";
import ImageBlock from "./ImageBlock/ImageBlock";
import TextBlock from "./TextBlock/TextBlock";

interface BlockDisplayProps {
  blocks: PageBlock[];
  pageData: Page;
  dispatch: Dispatch<PageReducerActions>;
}

const BlockDisplay: FC<BlockDisplayProps> = ({
  blocks,
  pageData,
  dispatch,
}) => {
  const renderBlock = (block: PageBlock, index: number) => {
    switch (block.blockType) {
      case "Text":
        return (
          <BlockWrapper index={index} dispatch={dispatch} key={index}>
            <TextBlock textBlock={block} index={index} dispatch={dispatch} />
          </BlockWrapper>
        );
      case "Image":
        return (
          <BlockWrapper index={index} dispatch={dispatch} key={index}>
            <ImageBlock imageBlock={block} index={index} dispatch={dispatch} />
          </BlockWrapper>
        );

      default:
        break;
      //   case "List":
      //     return <IconList />;
      //   case "Page":
      //     return <IconFileDescription />;
    }
  };

  return (
    <Stack sx={{ width: "100%", display: "flex", flexGrow: 1 }} spacing={1}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </Stack>
  );
};

export default BlockDisplay;
