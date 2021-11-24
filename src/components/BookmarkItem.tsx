import { Bookmark } from "../interfaces";
import bookmarkPlaceholder from "../images/bookmark-header-placeholder.png";

const BookmarkItem = ({ url, title, description, image }: Bookmark) => {
  return (
    <article>
      <img src={image ? image : bookmarkPlaceholder} width="200" alt="" />
      <h1>{title}</h1>
      <p>{description}</p>
      <a href={url}>URL</a>
    </article>
  );
};

export default BookmarkItem;
