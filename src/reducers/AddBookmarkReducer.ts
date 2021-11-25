import { Bookmark } from "../interfaces";
import { AsyncMetadataState } from "../interfaces/index";

const initialState: AsyncMetadataState = {
  newBookmark: {
    description: null,
    image: null,
    title: null,
    url: "",
  },
  status: "idle",
  error: null,
};

type ActionType =
  | { type: "fetch-metadata" }
  | {
      type: "update-input-value";
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: "set-metadata";
      payload: Bookmark;
    }
  | {
      type: "set-error";
      payload: {
        error: string;
      };
    };

export const addBookmarkReducer = (
  state: AsyncMetadataState,
  action: ActionType
): AsyncMetadataState => {
  const { newBookmark, status } = state;
  switch (action.type) {
    case "update-input-value": {
      /**
       * Users can only add a new bookmark when the fetchMetadata call returns a
       * successful response and the status is set to 'resolved'. However, we want
       * to allow users to edit title and description while maintaining the
       * 'resolved' status to let them save bookmarks with those manually added
       * values. However, if we let users edit the url value after a successful
       * response, they will be able to sabe bookmarks with a potentially invalid
       * URL. To prevent this from happening, we check the value that is being
       * updated and update the status accordingly.
       */

      const { name, value } = action.payload;

      if (name === "url") {
        const newState: AsyncMetadataState = {
          newBookmark: {
            description: "",
            image: null,
            title: "",
            url: value,
          },
          status: "idle", // This prevents having a 'resolved' status with a manually edited URL
          error: null,
        };

        return newState;
      } else {
        const newState: AsyncMetadataState = {
          newBookmark: { ...newBookmark },
          status,
          error: null,
        };

        newState.newBookmark[name as keyof Bookmark] = value;
        return newState;
      }
    }
    case "fetch-metadata":
      return {
        newBookmark: { ...newBookmark },
        status: "loading",
        error: null,
      };
    case "set-metadata": {
      const metadata = action.payload;

      const newState: AsyncMetadataState = {
        newBookmark: { ...metadata },
        status: "resolved",
        error: null,
      };

      return newState;
    }
    case "set-error": {
      const newState: AsyncMetadataState = {
        ...initialState,
        status: "rejected",
        error: "Oops! Something went wrong...",
      };
      newState.newBookmark.image = null;

      return newState;
    }
    default:
      return state;
  }
};
