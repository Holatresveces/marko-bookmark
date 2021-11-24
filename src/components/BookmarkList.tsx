import { Bookmark } from "../interfaces";
import BookmarkItem from "./BookmarkItem";

interface Props {
  bookmarks: Bookmark[];
  deleteBookmark: (bookmark: Bookmark) => void;
}

const BookmarksList = ({ bookmarks, deleteBookmark }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-6 md:grid-cols-3 md:gap-6 lg:grid-cols-4 lg:gap-10">
      {bookmarks.map((bookmark) => (
        <BookmarkItem
          key={bookmark.url}
          bookmark={bookmark}
          deleteBookmark={deleteBookmark}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
