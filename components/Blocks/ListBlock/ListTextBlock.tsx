import { Group, Stack, Textarea, Text } from "@mantine/core";
import React, { KeyboardEvent, FC } from "react";

interface ListTextBlockProps {
  index: number;
  id: string;
  text: string;
  updateListText: (id: string, text: string) => void;
  addNewListItem: (position: number) => void;
}

const ListTextBlock: FC<ListTextBlockProps> = ({
  index,
  id,
  text,
  updateListText,
  addNewListItem,
}) => {
  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key == "Enter" && text.length > 0) {
      e.preventDefault();
      addNewListItem(index + 1);
    }
  };

  return (
    <Stack sx={{ flex: 1 }} spacing={0}>
      <Group sx={{ alignItems: "stretch" }}>
        <Text> - </Text>
        <Textarea
          onKeyDown={(e) => handleKeyPress(e)}
          sx={{ flex: 1 }}
          autosize
          variant="unstyled"
          defaultValue={text}
          onChange={(e) => {
            console.log("ran");
            updateListText(id, e.target.value);
          }}
        />
      </Group>
    </Stack>
  );
};

export default ListTextBlock;
