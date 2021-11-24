import { ChangeEvent, useReducer } from "react";
import { Bookmark } from "../interfaces";

// TODO: Handle error
// TODO: Update Bookmark interface

interface State {
  newBookmark: Bookmark;
  isLoading: boolean;
}

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
    };

const reducer = (state: State, action: ActionType): State => {
  const { newBookmark } = state;
  switch (action.type) {
    case "update-input-value": {
      const { name, value } = action.payload;

      // This works but doesn't enforce type checking on action.payload.value
      //
      // const newMetadata = {
      //   metadata: { ...metadata, [action.payload.name]: action.payload.value },
      //   isLoading: false,
      // };

      const newState = {
        newBookmark: { ...newBookmark },
        isLoading: false,
      };

      newState.newBookmark[name as keyof Bookmark] = value;

      return newState;
    }
    case "fetch-metadata":
      return { newBookmark: { ...newBookmark }, isLoading: true };
    case "set-metadata":
      return { newBookmark: { ...action.payload }, isLoading: false };
    default:
      return state;
  }
};

interface Props {
  toggleDialog: () => void;
}

const AddBookmarkModal = ({ toggleDialog }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    newBookmark: {
      description: "",
      image: "",
      title: "",
      url: "",
    },
    isLoading: false,
  });

  const { isLoading } = state;
  const { description, image, title, url } = state.newBookmark;

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    dispatch({ type: "update-input-value", payload: { name, value } });
  };

  const loadMetadata = () => {
    if (isLoading || !url.trim()) return;
    dispatch({ type: "fetch-metadata" });

    setTimeout(() => {
      const metadata = {
        url: "www.google.com",
        image: null,
        title: "Test Title",
        description: "Test Description",
      };

      dispatch({ type: "set-metadata", payload: metadata });
    }, 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        top: "0",
        left: "0",
        background: "white",
      }}
    >
      <div>
        Create a new bookmark{" "}
        <span
          onClick={toggleDialog}
          style={{
            float: "right",
            padding: "30px",
          }}
        >
          X
        </span>
      </div>
      <form>
        <div>
          <label>
            Insert your URL
            <input
              disabled={isLoading}
              name="url"
              onChange={handleChange}
              type="text"
              value={url || ""}
            />
          </label>
        </div>

        <input
          disabled={isLoading}
          onClick={loadMetadata}
          placeholder="https://company.com"
          type="button"
          value="Load metadata"
        />

        <div>
          <div>Meta Image</div>
          <div
            style={{
              width: "200px",
              height: "100px",
              background: "#ddd",
            }}
          ></div>
        </div>

        <div>
          <label>
            Meta Title
            <input
              disabled={isLoading}
              name="title"
              onChange={handleChange}
              placeholder="Ex. Welcome to my website"
              type="text"
              value={title || ""}
            />
          </label>
        </div>

        <div>
          <label>
            Meta Description
            <input
              disabled={isLoading}
              name="description"
              onChange={handleChange}
              type="text"
              value={description || ""}
            />
          </label>
        </div>

        <input disabled={isLoading} type="button" value="Save bookmark" />
        <div className="debug">{JSON.stringify(state, null, 3)}</div>
      </form>
    </div>
  );
};

export default AddBookmarkModal;
