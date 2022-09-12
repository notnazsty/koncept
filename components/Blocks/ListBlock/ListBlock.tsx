import { List, Stack } from "@mantine/core";
import React, { ChangeEvent, Dispatch, FC } from "react";
import { uuid } from "uuidv4";
import { BlockType, ListBlockType, ListItem } from "../../../models/blocks";
import { PageReducerActions } from "../../../models/pages";
import ListTextBlock from "./ListTextBlock";

interface ListBlockProps {
  listBlock: ListBlockType;
  index: number;
  dispatch: Dispatch<PageReducerActions>;
}

// Implement Bullet Types

const ListBlock: FC<ListBlockProps> = ({ listBlock, index, dispatch }) => {
  const updateListText = (id: string, text: string) => {
    dispatch({
      type: "editBlock",
      newBlock: {
        ...listBlock,
        list: listBlock.list.map((val) => {
          if (val.id != id) {
            return val;
          }
          return { id: val.id, text };
        }),
      },
      index: index,
    });
  };

  const addNewListItem = (position: number) => {
    dispatch({
      type: "editBlock",
      newBlock: {
        ...listBlock,
        list: [
          ...listBlock.list.slice(0, position),
          { id: uuid(), text: "" },
          ...listBlock.list.slice(position),
        ],
      },
      index: index,
    });
  };

  return (
    <Stack sx={{ flex: 1 }}>
      {listBlock.list.map((listItem, i) => (
        <ListTextBlock
          index={i}
          addNewListItem={addNewListItem}
          updateListText={updateListText}
          key={listItem.id}
          text={listItem.text}
          id={listItem.id}
        />
      ))}
    </Stack>
  );
};

export default ListBlock;
