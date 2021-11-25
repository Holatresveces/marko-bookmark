import { ChangeEvent } from "react";
import { Bookmark, AsyncFormState } from "../interfaces";
import AddBookmarkHeader from "./AddBookmarkHeader";
import AddBookmarkForm from "./AddBookmarkForm";

interface Props {
  addBookmark: (bookmark: Bookmark) => void;
  bookmarks: Bookmark[];
  toggleAddBookmarkDialog: () => void;
  asyncFormState: AsyncFormState;
  showAddBookmarkDialog: boolean;
  updateInput: (payload: { name: string; value: string }) => void;
  fetchMetadata: () => void;
}

const AddBookmarkDialog = ({
  addBookmark,
  bookmarks,
  toggleAddBookmarkDialog,
  asyncFormState,
  showAddBookmarkDialog,
  fetchMetadata,
  updateInput,
}: Props) => {
  const { status, data } = asyncFormState;

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
    <>
      {/* There are probably better ways to accomplish these animations asdfasd */}
      <div
        style={{
          pointerEvents: showAddBookmarkDialog ? "auto" : "none",
          opacity: showAddBookmarkDialog ? "1" : "0",
          transition: "opacity 0.4s",
        }}
        className="fixed inset-0 bg-gray-700 bg-opacity-50"
      ></div>
      <div
        style={{
          transition: "transform 0.4s",
          transform: showAddBookmarkDialog
            ? "translate3d(0, 0, 0"
            : "translate3d(100%, 0, 0)",
        }}
        className="fixed top-0 right-0 bg-white h-full w-full max-w-lg"
      >
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
        <AddBookmarkHeader toggleAddBookmarkDialog={toggleAddBookmarkDialog} />
        <AddBookmarkForm
          asyncFormState={asyncFormState}
          handleInputChange={handleInputChange}
          fetchMetadata={fetchMetadata}
          handleSaveBookmark={handleSaveBookmark}
        />
      </div>
    </>
  );
};

export default AddBookmarkDialog;
