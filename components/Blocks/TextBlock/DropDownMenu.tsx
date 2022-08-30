import { Button, Stack } from "@mantine/core";
import {
  IconFileDescription,
  IconLetterCase,
  IconList,
  IconPhoto,
} from "@tabler/icons";
import React, { FC } from "react";
import { BlockType } from "../../../models/blocks";

interface DropDownMenuProps {
  searchQuery: string;
  changeBlockType: (blockType: BlockType) => void;
}

const DropDownMenu: FC<DropDownMenuProps> = ({
  searchQuery,
  changeBlockType,
}) => {
  const blockTypeArray: BlockType[] = [
    BlockType.TextBlock,
    BlockType.ImageBlock,
    BlockType.ListBlock,
    BlockType.SubPageBlock,
  ];

  const menuItemIcon = (type: BlockType) => {
    switch (type) {
      case "Image":
        return <IconPhoto />;
      case "Text":
        return <IconLetterCase />;
      case "List":
        return <IconList />;
      case "Page":
        return <IconFileDescription />;
    }
  };

  return (
    <Stack
      spacing={2}
      style={{
        marginTop: 40,
        position: "absolute",
        zIndex: 1000,
        borderRadius: 12,
        width: "200px",
        boxShadow: "4px 4px 4px lightgray",
        backgroundColor: "white",
      }}
    >
      {blockTypeArray
        .filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((blockType, i) => (
          <Button
            key={i}
            variant="subtle"
            sx={{
              ":hover": { backgroundColor: "#dadce0" },
              paddingLeft: 8,
              cursor: "pointer",
              color: "black",
              backgroundColor: "inherit",
            }}
            styles={{
              inner: {
                display: "flex",
                justifyContent: "left",
                paddingLeft: 8,
              },
            }}
            onClick={() => changeBlockType(blockType)}
            leftIcon={menuItemIcon(blockType)}
          >
            {blockType}
          </Button>
        ))}
    </Stack>
  );
};

export default DropDownMenu;
