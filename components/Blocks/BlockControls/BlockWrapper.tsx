import { Group, Tooltip, Button } from "@mantine/core";
import { IconPlus, IconDragDrop2 } from "@tabler/icons";
import React, { Dispatch, FC, ReactNode } from "react";
import { PageReducerActions } from "../../../models/pages";
import { defaultTextBlock } from "../../../utils/defaultBlocks";

interface BlockWrapperProps {
  index: number;
  children: ReactNode;
  dispatch: Dispatch<PageReducerActions>;
}

const BlockWrapper: FC<BlockWrapperProps> = ({ index, children, dispatch }) => {
  return (
    <Group
      spacing={2}
      style={{
        overflow: "hidden",
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
        flexWrap: "nowrap",
      }}
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
                dispatch({ type: "addBlock", block: defaultTextBlock, index: index + 1 })
              }
            />
          </Button>
        </Tooltip>

        <Tooltip
          multiline
          width={108}
          label="Drag to move. Click to open."
          position="bottom"
          withArrow
          color="dark"
        >
          <Button variant="white" sx={{ width: "18", padding: 0 }}>
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
