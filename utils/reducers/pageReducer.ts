import { Page, PageReducerActions, PageReducerState } from "../../models/pages";

export const pageReducer = (state: Page, action: PageReducerActions): Page => {
  switch (action.type) {
    case "changeName":
      return { ...state, name: action.newName };
    case "changeIcon":
      return { ...state, icon: action.newIcon };
    case "changeLastEdit":
      return { ...state, lastEditedAt: action.newDate };
    case "reorderBlocks":
      return { ...state, blocks: action.newOrder };

    case "addBlock":
      return {
        ...state,
        blocks: [
          ...state.blocks.slice(0, action.index),
          action.block,
          ...state.blocks.slice(action.index),
        ],
      };

    case "removeBlock":
      return {
        ...state,
        blocks: [
          ...state.blocks.filter((val, i) => {
            if (i != action.index) {
              return true;
            }
            return false;
          }),
        ],
      };

    case "editBlock":
      return {
        ...state,
        blocks: [
          ...state.blocks.map((val, i) => {
            if (i == action.index) {
              return action.newBlock;
            } else {
              return val;
            }
          }),
        ],
      };

    default:
      return state;
  }
};
