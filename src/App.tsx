import { useEffect, useState } from "react";
import { Bookmark } from "./interfaces";
import BookmarkList from "./components/BookmarkList";
import AddBookmarkDialog from "./components/AddBookmarkDialog";

const App = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const value = window.localStorage.getItem("bookmarks");
    if (value) {
      return JSON.parse(value);
    } else {
      return [];
    }
  });
  const [showAddBookmarkDialog, setShowAddBookmarkDialog] = useState(false);

  useEffect(() => {
    window.localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleAddBookmarkDialog = () => {
    setShowAddBookmarkDialog(!showAddBookmarkDialog);
  };

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks([...bookmarks, bookmark]);
  };

  const deleteBookmark = ({ url }: Bookmark) => {
    const filteredBookmarks = bookmarks.filter(
      (bookmark) => bookmark.url !== url
    );
    setBookmarks(filteredBookmarks);
  };

  return (
    <>
      <h1>Marko</h1>
      <h2>My bookmarks</h2>
      <button onClick={toggleAddBookmarkDialog}>Add new bookmark</button>
      <BookmarkList bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
      {showAddBookmarkDialog && (
        <AddBookmarkDialog
          addBookmark={addBookmark}
          bookmarks={bookmarks}
          toggleDialog={toggleAddBookmarkDialog}
        />
      )}
    </>
  );
};

export default App;
