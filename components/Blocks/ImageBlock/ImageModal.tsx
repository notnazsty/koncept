import {
  Modal,
  TextInput,
  Group,
  Button,
  Image as MImage,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconLink, IconUpload } from "@tabler/icons";
import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { ImageBlockType } from "../../../models/blocks";

interface ImageModalProps {
  imageBlock: ImageBlockType;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setImage: (newURI: string, width: number, height: number) => void;
}

const ImageModal: FC<ImageModalProps> = ({
  opened,
  setImage,
  setOpened,
  imageBlock,
}) => {
  const [value, setValue] = useState("");
  const [debounced] = useDebouncedValue(value, 200);
  const [width, setWidth] = useState(imageBlock.width);
  const [height, setHeight] = useState(imageBlock.height);
  const imageRef = useRef<HTMLDivElement>(null);

  // Container size & width
  const updateDimensions = () => {
    if (imageRef.current) {
      setHeight(imageRef.current.clientHeight);
      setWidth(imageRef.current.clientWidth);
    }
  };

  // Actual Size & Width
  // const getDimensions = () => {
  //   const img = new Image();
  //   img.src = debounced;
  //   setHeight(img.height);
  //   setWidth(img.width);
  // };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Upload Your Image"
      >
        <TextInput
          data-autofocus
          icon={<IconLink />}
          variant="filled"
          placeholder="Image URL"
          radius="md"
          onChange={(e) => setValue(e.target.value)}
        />

        {debounced.length > 1 && (
          <MImage
            ref={imageRef}
            pt={8}
            radius={8}
            src={debounced}
            sx={{ maxWidth: "100%" }}
            alt="preview"
            onLoad={() => updateDimensions()}
          />
        )}

        <Group
          pt={8}
          pr={8}
          sx={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <Button
            leftIcon={<IconUpload size={16} />}
            sx={{ borderRadius: 16 }}
            onClick={() => {
              setImage(debounced, width, height);
              setOpened(false);
            }}
          >
            Upload
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default ImageModal;
