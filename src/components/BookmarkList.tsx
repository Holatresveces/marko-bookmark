import { Bookmark } from "../interfaces";
import BookmarkItem from "./BookmarkItem";

interface Props {
  bookmarks: Bookmark[];
  deleteBookmark: (bookmark: Bookmark) => void;
}

const BookmarksList = ({ bookmarks, deleteBookmark }: Props) => {
  return (
    <div>
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
