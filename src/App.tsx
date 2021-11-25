import { useBookmarks } from "./hooks/useBookmarks";
import { useState } from "react";
import Header from "./components/Header";
import Welcome from "./components/Welcome";
import BookmarksContainer from "./components/BookmarksContainer";
import AddBookmarkDialog from "./components/AddBookmarkDialog";

const App = () => {
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

      {showAddBookmarkDialog && (
        <AddBookmarkDialog
          addBookmark={addBookmark}
          toggleAddBookmarkDialog={toggleAddBookmarkDialog}
        />
      )}
    </>
  );
};

export default App;
