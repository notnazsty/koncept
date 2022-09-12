import { Group, Tooltip, Button } from "@mantine/core";
import { IconPlus, IconDragDrop2 } from "@tabler/icons";
import React, { Dispatch, FC, ReactNode, useRef } from "react";
import { Page, PageReducerActions } from "../../../models/pages";
import { getDefaultTextBlock } from "../../../utils/defaultBlocks";
import { useDrag, useDrop, XYCoord } from "react-dnd";

interface BlockWrapperProps {
  index: number;
  children: ReactNode;
  dispatch: Dispatch<PageReducerActions>;
  state: Page;
}

interface DragItem {
  index: number;
  type: string;
}

const BlockWrapper: FC<BlockWrapperProps> = ({
  index,
  children,
  dispatch,
  state,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: any }>({
    accept: "Block",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch({
        type: "switchBlocks",
        positionOne: dragIndex,
        positionTwo: hoverIndex,
      });

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Block",
    item: () => {
      return { index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.2 : 1;
  drag(drop(ref));

  return (
    <Group
      ref={ref}
      spacing={2}
      style={{
        opacity,
        marginBlock: 4,
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

        <Button variant="white" sx={{ width: "18", padding: 0 }}>
          <IconDragDrop2 size={18} style={{ cursor: "grab", color: "black" }} />
        </Button>
      </Group>
      {children}
    </Group>
  );
};

export default BlockWrapper;
