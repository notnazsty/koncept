import { Stack, Textarea } from "@mantine/core";
import { useFocusWithin } from "@mantine/hooks";
import React, {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  FC,
  useEffect,
  useState,
} from "react";
import { BlockType, TextBlockType } from "../../../models/blocks";
import { PageReducerActions } from "../../../models/pages";
import {
  getDefaultImageBlock,
  getDefaultListBlock,
  getDefaultTextBlock,
} from "../../../utils/defaultBlocks";
import DropDownMenu from "./DropDownMenu";

interface TextBlockProps {
  textBlock: TextBlockType;
  index: number;
  dispatch: Dispatch<PageReducerActions>;
}

const TextBlock: FC<TextBlockProps> = ({ textBlock, index, dispatch }) => {
  const { ref, focused } = useFocusWithin();

  const [value, setValue] = useState(textBlock.text);
  const [opened, setOpened] = useState(false);

  const changeBlockType = (blockType: BlockType) => {
    switch (blockType) {
      case "Text":
        dispatch({
          type: "editBlock",
          newBlock: getDefaultTextBlock(),
          index: index,
        });
        break;
      case "Image":
        dispatch({
          type: "editBlock",
          newBlock: getDefaultImageBlock(),
          index: index,
        });
        break;
      case "List":
        dispatch({
          type: "editBlock",
          newBlock: getDefaultListBlock(),
          index: index,
        });
        break;
      default:
        break;
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    dispatch({
      type: "editBlock",
      newBlock: { ...textBlock, text: e.target.value },
      index: index,
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    console.log(e.key);
    if (e.key == "Enter" && value.substring(0, 1) == "/" && focused) {
      const t = value.toLowerCase().substring(1);
      switch (t) {
        case "text":
          changeBlockType(BlockType.TextBlock);
          break;
        case "image":
          changeBlockType(BlockType.ImageBlock);
          break;
        case "list":
          changeBlockType(BlockType.ListBlock);
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (value.substring(0, 1) == "/" && focused) {
      setOpened(true);
    } else {
      setOpened(false);
    }
  }, [focused, value]);

  return (
    <Stack ref={ref} sx={{ flex: 1 }}>
      <Textarea
        autosize
        variant="unstyled"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        onKeyDown={(e) => {
          handleKeyPress(e);
        }}
        styles={
          value.length == 0
            ? {
                root: {
                  ":hover": {
                    opacity: "100%",
                  },
                  opacity: "0%",
                },
              }
            : {}
        }
      />
      {opened && (
        <DropDownMenu
          changeBlockType={changeBlockType}
          searchQuery={value.substring(1)}
        />
      )}
    </Stack>
  );
};

export default TextBlock;
