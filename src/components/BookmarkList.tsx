import { Bookmark } from "../interfaces";
import BookmarkItem from "./BookmarkItem";

interface Props {
  bookmarks: Bookmark[];
}

const BookmarksList = ({ bookmarks }: Props) => {
  return (
    <div>
      {bookmarks.map(({ description, url, title, image }) => (
        <BookmarkItem
          key={url}
          description={description}
          url={url}
          title={title}
          image={image}
        />
      ))}
    </div>
  );
};

export default BookmarksList;
