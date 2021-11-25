import { ChangeEvent, useReducer } from "react";
import { Bookmark, AsyncMetadataState } from "../interfaces";
import axios from "axios";
import AddBookmarkHeader from "./AddBookmarkHeader";
import AddBookmarkForm from "./AddBookmarkForm";
import { addBookmarkReducer } from "../reducers/AddBookmarkReducer";

const initialState: AsyncMetadataState = {
  newBookmark: {
    description: "",
    image: "",
    title: "",
    url: "",
  },
  status: "idle",
  error: null,
};

interface Props {
  addBookmark: (bookmark: Bookmark) => void;
  toggleDialog: () => void;
}

const AddBookmarkModal = ({ addBookmark, toggleDialog }: Props) => {
  const [state, dispatch] = useReducer(addBookmarkReducer, initialState);

  const { newBookmark, status } = state;
  const { url } = newBookmark;

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
    console.log("New bookmark added");
    addBookmark(newBookmark);
  };

  const fetchMetadata = () => {
    if (status === "loading") return;

    if (!url.trim()) {
      alert("Insert a valid URL!");
      return;
    }

    dispatch({ type: "fetch-metadata" });

    const baseUrl = "/api/metadata";

    axios
      .get(`${baseUrl}?url=${url}`)
      .then(({ data }) => {
        console.log("metadata fetched successfully");
        console.log(data);
        dispatch({ type: "set-metadata", payload: data });
      })
      .catch((err) => {
        console.log("metadata fetching failed");
        console.log(err);
        alert("Whoops! Something went wrong...");
        dispatch({ type: "set-error", payload: { error: err } });
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50">
      <div className="absolute right-0 bg-white h-full w-full max-w-lg">
        <div
          style={{
            // Probably not the best way to do this lol
            transition: "opacity 0.2s",
          }}
          className={`absolute top-0 left-0 w-full h-full bg-white ${
            status === "loading"
              ? "opacity-50"
              : "pointer-events-none opacity-0"
          }`}
        ></div>
        <AddBookmarkHeader toggleDialog={toggleDialog} />
        <AddBookmarkForm
          state={state}
          handleInputChange={handleInputChange}
          fetchMetadata={fetchMetadata}
          handleSaveBookmark={handleSaveBookmark}
        />
      </div>
    </div>
  );
};

export default AddBookmarkModal;
