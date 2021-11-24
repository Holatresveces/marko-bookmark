import { ChangeEvent, useReducer } from "react";
import { Bookmark } from "../interfaces";
import { IoMdClose } from "react-icons/io";
import bookmarkPlaceholder from "../images/bookmark-header-placeholder.png";
import axios from "axios";

// TODO: Handle error
// TODO: Update Bookmark interface

interface State {
  newBookmark: Bookmark;
  status: "idle" | "loading" | "resolved" | "rejected";
  error: string | null;
}

const initialState: State = {
  newBookmark: {
    description: "",
    image: "",
    title: "",
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
      type: "reset-metadata";
      payload: {
        error: string;
      };
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
      //   status === 'loading': false,
      // };

      const newState: State = {
        newBookmark: { ...newBookmark },
        status: "idle",
        error: null,
      };

      newState.newBookmark[name as keyof Bookmark] = value;

      return newState;
    }
    case "fetch-metadata":
      return {
        newBookmark: { ...newBookmark },
        status: "loading",
        error: null,
      };
    case "set-metadata": {
      const metadata = action.payload;
      const { image } = metadata;
      const newImage = image ? image : bookmarkPlaceholder;

      const newState: State = {
        newBookmark: { ...metadata },
        status: "resolved",
        error: null,
      };

      newState.newBookmark.image = newImage;

      return newState;
    }
    case "reset-metadata": {
      const newState: State = {
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

interface Props {
  addBookmark: (bookmark: Bookmark) => void;
  bookmarks: Bookmark[];
  toggleDialog: () => void;
}

const AddBookmarkModal = ({ addBookmark, bookmarks, toggleDialog }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { newBookmark, status } = state;
  const { description, image, title, url } = newBookmark;

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    dispatch({ type: "update-input-value", payload: { name, value } });
  };

  const handleSaveBookmark = () => {
    // Check if there's any missing field
    if (!description || !title || !url) {
      console.log("Missing field");
      return;
    }

    // Check if bookmarks's URL already exists
    if (bookmarks.find((bookmark) => bookmark.url === url)) {
      console.log("Bookmark already exists");
      return;
    }

    console.log("New bookmark added");
    addBookmark(newBookmark);
  };

  const loadMetadata = () => {
    if (status === "loading") return;

    if (!url.trim()) {
      console.log("Insert a valid URL!");
      return;
    }

    dispatch({ type: "fetch-metadata" });

    axios
      .get(`http://localhost:3001/api/metadata?url=${url}`)
      .then(({ data }) => {
        console.log("metadata fetched successfully");
        console.log(data);
        dispatch({ type: "set-metadata", payload: data });
      })
      .catch((err) => {
        console.log("metadata fetching failed");
        console.log(err);
        dispatch({ type: "reset-metadata", payload: { error: err } });
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50">
      <div className="absolute right-0 bg-white h-full max-w-lg">
        <div className="bg-indigo-600">
          <div className="p-7 flex justify-between items-center text-white">
            <h2 className="font-medium">Create a new bookmark</h2>{" "}
            <span className="cursor-pointer" onClick={toggleDialog}>
              <IoMdClose size="1.5em" />
            </span>
          </div>
        </div>
        <div className="p-7">
          <form>
            <div>
              <label className="font-medium" htmlFor="url">
                Insert your URL
              </label>
            </div>
            <input
              id="name"
              disabled={status === "loading"}
              name="url"
              onChange={handleInputChange}
              placeholder="https://company.com"
              type="text"
              value={url || ""}
            />

            <input
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium"
              disabled={status === "loading"}
              onClick={loadMetadata}
              placeholder="https://company.com"
              type="button"
              value="Load metadata"
            />

            <div className="flex items-center">
              <div className="flex-grow bg-gray-300 h-px"></div>
              <span className="px-2 text-gray-400">Preview</span>
              <div className="flex-grow bg-gray-300 h-px"></div>
            </div>

            <div className="font-medium">Meta Image</div>
            <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden">
              {image && (
                <img
                  className="w-full h-full object-cover"
                  src={image}
                  alt=""
                />
              )}
            </div>

            <div>
              <label className="font-medium" htmlFor="title">
                Meta Title
              </label>
            </div>
            <input
              id="title"
              disabled={status === "loading"}
              name="title"
              onChange={handleInputChange}
              placeholder="Ex. Welcome to my website"
              type="text"
              value={title || ""}
            />

            <div>
              <label className="font-medium" htmlFor="description">
                Meta Description
              </label>
            </div>
            <textarea
              disabled={status === "loading"}
              id="description"
              name="description"
              onChange={handleInputChange}
              value={description || ""}
            ></textarea>

            <input
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium"
              disabled={status === "loading"}
              onClick={handleSaveBookmark}
              type="button"
              value="Save bookmark"
            />
            <div className="debug">{JSON.stringify(state, null, 3)}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
