import { ChangeEvent } from "react";
import { Bookmark, AsyncMetadataState } from "../interfaces";
import AddBookmarkHeader from "./AddBookmarkHeader";
import AddBookmarkForm from "./AddBookmarkForm";

interface Props {
  addBookmark: (bookmark: Bookmark) => void;
  bookmarks: Bookmark[];
  toggleAddBookmarkDialog: () => void;
  state: AsyncMetadataState;
  updateInput: (payload: { name: string; value: string }) => void;
  fetchMetadata: () => void;
}

const AddBookmarkDialog = ({
  addBookmark,
  bookmarks,
  toggleAddBookmarkDialog,
  state,
  fetchMetadata,
  updateInput,
}: Props) => {
  const { status, data } = state;

  const handleInputChange = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = target;
    updateInput({ name, value });
  };

  const handleSaveBookmark = () => {
    if (status !== "resolved") {
      alert("Please load some metadata first");
      return;
    }
    if (bookmarks.find((bookmark) => bookmark.url === data.url)) {
      alert("Bookmark already exists");
      return;
    }
    addBookmark(data);
    toggleAddBookmarkDialog();
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
        <AddBookmarkHeader toggleAddBookmarkDialog={toggleAddBookmarkDialog} />
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

export default AddBookmarkDialog;
