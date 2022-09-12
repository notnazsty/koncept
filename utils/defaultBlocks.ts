import { v4 as uuid } from "uuid";
import {
  BlockType,
  ImageBlockType,
  ListBlockType,
  TextBlockType,
} from "../models/blocks";

export const getDefaultTextBlock = (): TextBlockType => {
  return {
    blockType: BlockType.TextBlock,
    text: "",
    color: "black",
    fontSize: 12,
    blockId: uuid(),
    createdAt: new Date(),
    lastEditedAt: new Date(),
  };
};

export const getDefaultImageBlock = (): ImageBlockType => {
  return {
    blockType: BlockType.ImageBlock,
    imageURL: "",
    height: 480,
    width: 640,
    blockId: uuid(),
    createdAt: new Date(),
    lastEditedAt: new Date(),
  };
};

export const getDefaultListBlock = (): ListBlockType => {
  return {
    blockType: BlockType.ListBlock,
    blockId: uuid(),
    createdAt: new Date(),
    lastEditedAt: new Date(),
    list: [{ id: uuid(), text: "Type Here" }],
    bulletType: "Dots",
  };
};
