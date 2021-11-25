import { useEffect, useState } from "react";
import { Bookmark } from "./interfaces";
import BookmarkList from "./components/BookmarkList";
import AddBookmarkDialog from "./components/AddBookmarkDialog";
import Header from "./components/Header";
import Button from "./components/Button";
import Welcome from "./components/Welcome";

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
    setShowAddBookmarkDialog(false);
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
      <Header />
      <main className="bg-gray-200 font-Inter h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="p-5">
            {bookmarks.length === 0 ? (
              <Welcome toggleAddBookmarkDialog={toggleAddBookmarkDialog} />
            ) : (
              <>
                <div className="flex justify-between items-center mt-14 mb-9">
                  <div>
                    <h1 className="font-semibold text-2xl mb-2">
                      My Bookmarks
                    </h1>
                    <div className="w-12 h-1 bg-indigo-600"></div>
                  </div>
                  <Button
                    onClick={toggleAddBookmarkDialog}
                    text="Add new bookmark"
                  />
                </div>

                <BookmarkList
                  bookmarks={bookmarks}
                  deleteBookmark={deleteBookmark}
                />
              </>
            )}
            {showAddBookmarkDialog && (
              <AddBookmarkDialog
                addBookmark={addBookmark}
                bookmarks={bookmarks}
                toggleDialog={toggleAddBookmarkDialog}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
