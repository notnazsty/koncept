import { List, Stack } from "@mantine/core";
import React, { ChangeEvent, Dispatch, FC } from "react";
import { BlockType, ListBlockType, ListElement } from "../../../models/blocks";
import { PageReducerActions } from "../../../models/pages";

interface ListBlockProps {
  listBlock: ListBlockType;
  index: number;
  dispatch: Dispatch<PageReducerActions>;
}


// Implement Bullet Types

const ListBlock: FC<ListBlockProps> = ({ listBlock, index, dispatch }) => {
  const displayList = (list: ListElement[], withPadding: boolean) => {
    return (
      <List withPadding={withPadding} type='unordered'>
        {list.map((item, i) => {
          if (typeof item == "string") {
            return <List.Item key={i}> {item} </List.Item>;
          }
          return displayList(item, true);
        })}
      </List>
    );
  };

  return <Stack sx={{ flex: 1 }}>{displayList(listBlock.list, false)}</Stack>;
};

export default ListBlock;
