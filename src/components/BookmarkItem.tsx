import { Bookmark } from "../interfaces";
import bookmarkPlaceholder from "../images/bookmark-header-placeholder.png";

interface Props {
  bookmark: Bookmark;
  deleteBookmark: (bookmark: Bookmark) => void;
}

const BookmarkItem = ({ bookmark, deleteBookmark }: Props) => {
  const { image, description, title, url } = bookmark;
  return (
    <article>
      <img src={image ? image : bookmarkPlaceholder} width="200" alt="" />
      <h1>{title ? title : "[No title]"}</h1>
      <p>{description ? description : "[No description]"}</p>
      <a href={url}>URL</a>
      <button onClick={() => deleteBookmark(bookmark)}>Delete</button>
    </article>
  );
};

export default BookmarkItem;
