import { Bookmark } from "../interfaces";
import BookmarkList from "./BookmarkList";
import Button from "./Button";

interface Props {
  bookmarks: Bookmark[];
  toggleAddBookmarkDialog: () => void;
  deleteBookmark: (bookmark: Bookmark) => void;
  addBookmark: (bookmark: Bookmark) => void;
}

const BookmarksContainer = ({
  bookmarks,
  toggleAddBookmarkDialog,
  deleteBookmark,
}: Props) => {
  return (
    <main className="bg-gray-200 pt-20 font-Inter h-screen">
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto p-5">
          <div className="flex justify-between items-center mt-14 mb-9">
            <div>
              <h1 className="font-semibold text-2xl mb-2">My Bookmarks</h1>
              <div className="w-12 h-1 bg-indigo-600"></div>
            </div>
            <Button onClick={toggleAddBookmarkDialog} text="Add new bookmark" />
          </div>

          <BookmarkList bookmarks={bookmarks} deleteBookmark={deleteBookmark} />
        </div>
      </div>
    </main>
  );
};

export default BookmarksContainer;
