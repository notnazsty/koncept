import { uuid } from "uuidv4";
import { BlockType, ImageBlockType, TextBlockType } from "../models/blocks";

export const defaultTextBlock: TextBlockType = {
  blockType: BlockType.TextBlock,
  text: "",
  color: "black",
  fontSize: 12,
  blockId: uuid(),
  createdAt: new Date(),
  lastEditedAt: new Date(),
};

export const defaultImageBlock: ImageBlockType = {
  blockType: BlockType.ImageBlock,
  imageURL: "",
  height: 480,
  width: 640,
  blockId: uuid(),
  createdAt: new Date(),
  lastEditedAt: new Date(),
};
