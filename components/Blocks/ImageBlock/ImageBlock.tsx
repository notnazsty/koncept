import { Stack, Button } from "@mantine/core";
import { IconPictureInPicture } from "@tabler/icons";
import { Resizable } from "re-resizable";
import React, { Dispatch, FC, useState } from "react";
import { ImageBlockType } from "../../../models/blocks";
import { PageReducerActions } from "../../../models/pages";
import ImageModal from "./ImageModal";

interface ImageBlockProps {
  imageBlock: ImageBlockType;
  index: number;
  dispatch: Dispatch<PageReducerActions>;
}

const ImageBlock: FC<ImageBlockProps> = ({ imageBlock, index, dispatch }) => {
  const [opened, setOpened] = useState(false);

  // Update Image && Width/Height
  const setImage = (newURL: string, width: number, height: number) => {
    dispatch({
      type: "editBlock",
      newBlock: {
        ...imageBlock,
        imageURL: newURL,
        height: height,
        width: width,
      },
      index: index,
    });
  };

  return (
    <Stack sx={{ flex: 1 }}>

      {/* TODO Images Take Up More Space Than Visible */}
      {imageBlock.imageURL ? (
        <Resizable
          defaultSize={{
            width: imageBlock.width,
            height: imageBlock.height,
          }}
          style={{
            background: `url(${imageBlock.imageURL})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          lockAspectRatio={true}
        />
      ) : (
        <Button
          leftIcon={<IconPictureInPicture />}
          sx={{
            backgroundColor: "#E3E2DF",
            color: "#96948F",
            ":hover": { backgroundColor: "#dadce0" },
          }}
          styles={{
            root: {
              display: "flex",
              flexDirection: "row",
              justifyContent: "left",
            },
          }}
          onClick={() => setOpened(true)}
        >
          Add an image
        </Button>
      )}
      <ImageModal imageBlock={imageBlock} opened={opened} setOpened={setOpened} setImage={setImage} />
    </Stack>
  );
};

export default ImageBlock;
