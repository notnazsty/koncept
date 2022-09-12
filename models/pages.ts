import { PageBlock } from "./blocks";

export interface Page {
  pageId: string;
  name: string;
  icon: IconList;
  createdAt: Date;
  lastEditedAt: Date;
  blocks: PageBlock[];
}

export interface PageReducerState {
  isLoaded: boolean;
  isUpdating: boolean;
  lastUpdated: boolean;
  pageData: Page;
}

export type IconList = string; // Replace With Different Icon Types

export type PageReducerActions =
  | { type: "changeName"; newName: string }
  | { type: "changeIcon"; newIcon: IconList }
  | { type: "changeLastEdit"; newDate: Date }
  | { type: "addBlock"; block: PageBlock; index: number }
  | { type: "removeBlock"; index: number }
  | { type: "reorderBlocks"; newOrder: PageBlock[] }
  | { type: "editBlock"; newBlock: PageBlock; index: number }
  | { type: "switchBlocks"; positionOne: number; positionTwo: number }
  | { type: "sync" };

export interface PageReducerState {
  data: Page;
}
