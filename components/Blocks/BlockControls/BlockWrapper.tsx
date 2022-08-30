import { Group, Tooltip, Button } from "@mantine/core";
import { IconPlus, IconDragDrop2 } from "@tabler/icons";
import React, { Dispatch, FC, ReactNode, useState } from "react";
import { Page, PageReducerActions } from "../../../models/pages";
import { getDefaultTextBlock } from "../../../utils/defaultBlocks";

interface BlockWrapperProps {
  index: number;
  children: ReactNode;
  dispatch: Dispatch<PageReducerActions>;
  state: Page;
}

const BlockWrapper: FC<BlockWrapperProps> = ({
  index,
  children,
  dispatch,
  state,
}) => {
  const [draggableState, setDraggableState] = useState(false);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("ran", index);
    e.dataTransfer.setData("index", `${index}`);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    let initIndex = parseInt(e.dataTransfer.getData("index"));
    if (typeof initIndex == "number") {
      let initBlockVal = state.blocks[initIndex];
      let currentBlockVal = state.blocks[index];
      console.log({ initIndex, initBlockVal }, { index, currentBlockVal });

      const newBlockOrder = state.blocks.map((block, i) => {
        if (i == index) return initBlockVal;

        if (i === initIndex) return currentBlockVal;

        return block;
      });

      console.log(newBlockOrder);

      dispatch({
        type: "reorderBlocks",
        newOrder: newBlockOrder,
      });
    }
  };

  return (
    <Group
      spacing={2}
      draggable={draggableState}
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        flexWrap: "nowrap",
      }}
      onDragStart={(e) => {
        onDragStart(e);
      }}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => e.preventDefault()}
    >
      <Group
        spacing={4}
        sx={{
          height: 36,
          flexShrink: 0,
          ":hover": {
            opacity: "100",
          },
          opacity: "0",
        }}
      >
        <Tooltip
          label="Click to add a block below"
          position="bottom"
          withArrow
          color="dark"
        >
          <Button variant="white" sx={{ width: "18", padding: 0 }}>
            <IconPlus
              size={18}
              style={{ cursor: "pointer", color: "black" }}
              onClick={() =>
                dispatch({
                  type: "addBlock",
                  block: getDefaultTextBlock(),
                  index: index + 1,
                })
              }
            />
          </Button>
        </Tooltip>

        <Tooltip
          sx={
            !draggableState
              ? { visibility: "inherit" }
              : { visibility: "hidden" }
          }
          multiline
          width={108}
          label="Drag to move. Click to open."
          position="bottom"
          withArrow
          color="dark"
        >
          <Button
            variant="white"
            sx={{ width: "18", padding: 0 }}
            onTouchStart={() => setDraggableState(true)}
            onMouseDown={() => setDraggableState(true)}
            onMouseUp={() => setDraggableState(false)}
            onMouseLeave={() => setDraggableState(false)}
            onTouchEnd={() => setDraggableState(false)}
          >
            <IconDragDrop2
              size={18}
              style={{ cursor: "pointer", color: "black" }}
            />
          </Button>
        </Tooltip>
      </Group>
      {children}
    </Group>
  );
};

export default BlockWrapper;
