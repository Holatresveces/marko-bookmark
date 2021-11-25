import { useBookmarks } from "./hooks/useBookmarks";
import { useState } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import BookmarksContainer from "./components/BookmarksContainer";
import AddBookmarkDialog from "./components/AddBookmarkDialog";
import { useAsyncForm } from "./hooks/useAsyncForm";

const App = () => {
  // useAsyncForm keeps track of form input values which can also be modified by the fetchMetadata async call
  const { asyncFormState, updateInput, fetchMetadata } = useAsyncForm({
    data: {
      description: null,
      image: null,
      title: null,
      url: "",
    },
    status: "idle",
    error: null,
  });

  // Retrieve bookmarks stored in localStorage
  const { bookmarks, addBookmark, deleteBookmark } = useBookmarks();
  const [showAddBookmarkDialog, setShowAddBookmarkDialog] = useState(false);

  const toggleAddBookmarkDialog = () => {
    setShowAddBookmarkDialog(!showAddBookmarkDialog);
  };

  return (
    <>
      <Header />

      {bookmarks.length === 0 ? (
        <Welcome toggleAddBookmarkDialog={toggleAddBookmarkDialog} />
      ) : (
        <BookmarksContainer
          addBookmark={addBookmark}
          bookmarks={bookmarks}
          deleteBookmark={deleteBookmark}
          toggleAddBookmarkDialog={toggleAddBookmarkDialog}
        />
      )}

      <AddBookmarkDialog
        addBookmark={addBookmark}
        bookmarks={bookmarks}
        fetchMetadata={fetchMetadata}
        asyncFormState={asyncFormState}
        showAddBookmarkDialog={showAddBookmarkDialog}
        toggleAddBookmarkDialog={toggleAddBookmarkDialog}
        updateInput={updateInput}
      />
    </>
  );
};

export default App;
