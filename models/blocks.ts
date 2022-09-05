export enum BlockType {
  TextBlock = "Text",
  ImageBlock = "Image",
  ListBlock = "List",
  SubPageBlock = "Page",
}

export type PageBlock =
  | TextBlockType
  | ImageBlockType
  | ListBlockType
  | SubPageBlockType;

export interface AbstractPageBlock {
  blockId: string;
  blockType: BlockType;
  createdAt: Date;
  lastEditedAt: Date;
}

export interface TextBlockType extends AbstractPageBlock {
  blockType: BlockType.TextBlock;
  text: string;
  color: string; // Hex Value?
  fontSize: number;
  // TODO Add More Styling Options
}

export interface ImageBlockType extends AbstractPageBlock {
  blockType: BlockType.ImageBlock;
  imageURL: string;
  height: number;
  width: number;
}

export interface ListBlockType extends AbstractPageBlock {
  blockType: BlockType.ListBlock;
  list: ListElement[];
  bulletType: "Numbered" | "Dots" | "Dashes";
  // TODO Expand on This (MAKE MORE CONCRETE)
}

export type ListElement = (string | string[] | string[][]);

export interface SubPageBlockType extends AbstractPageBlock {
  blockType: BlockType.SubPageBlock;
  subPageId: string;
}
