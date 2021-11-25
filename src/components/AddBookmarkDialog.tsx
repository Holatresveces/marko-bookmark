import { ChangeEvent, useReducer } from "react";
import { Bookmark } from "../interfaces";
import { IoMdClose } from "react-icons/io";
import axios from "axios";
import BookmarkPreview from "./BookmarkPreview";

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
  const { newBookmark, status } = state;
  switch (action.type) {
    case "update-input-value": {
      const { name, value } = action.payload;

      if (name === "url") {
        const newState: State = {
          newBookmark: {
            description: "",
            image: null,
            title: "",
            url: value,
          },
          status: "idle",
          error: null,
        };

        return newState;
      } else {
        const newState: State = {
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

      const newState: State = {
        newBookmark: { ...metadata },
        status: "resolved",
        error: null,
      };

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
    if (status !== "resolved") {
      alert("Please load some metadata first :)");
      return;
    }

    // Check if bookmarks's URL already exists
    if (bookmarks.find((bookmark) => bookmark.url === url)) {
      alert("Bookmark already exists");
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
        alert("Whoops! Something went wrong...");
        dispatch({ type: "reset-metadata", payload: { error: err } });
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50">
      <div className="absolute right-0 bg-white h-full w-full max-w-lg">
        <div
          style={{
            transition: "opacity 0.2s",
          }}
          className={`absolute top-0 left-0 w-full h-full bg-white ${
            status === "loading"
              ? "opacity-50"
              : "pointer-events-none opacity-0"
          }`}
        ></div>
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
            <div className="mb-2">
              <label className="font-medium" htmlFor="url">
                Insert your URL
              </label>
            </div>
            <input
              className="block w-full p-2 border-solid border-2 border-black rounded-md mb-2"
              id="name"
              disabled={status === "loading"}
              name="url"
              onChange={handleInputChange}
              placeholder="https://company.com"
              type="text"
              value={url || ""}
            />

            <input
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium cursor-pointer"
              disabled={status === "loading"}
              onClick={loadMetadata}
              placeholder="https://company.com"
              type="button"
              value="Load metadata"
            />

            <BookmarkPreview
              image={image}
              status={status}
              handleInputChange={handleInputChange}
              title={title}
              description={description}
            />

            <input
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium cursor-pointer"
              disabled={status === "loading"}
              onClick={handleSaveBookmark}
              type="button"
              value="Save bookmark"
            />
            {/* For debugging purposes */}
            {/* <pre className="debug">{JSON.stringify(state, null, 3)}</pre> */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBookmarkModal;
