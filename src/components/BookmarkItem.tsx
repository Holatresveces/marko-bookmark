import { Bookmark } from "../interfaces";
import bookmarkPlaceholder from "../images/bookmark-header-placeholder.png";
import { FiLink } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";

interface Props {
  bookmark: Bookmark;
  deleteBookmark: (bookmark: Bookmark) => void;
}

const BookmarkItem = ({ bookmark, deleteBookmark }: Props) => {
  const { image, description, title, url } = bookmark;
  return (
    <article className="w-full rounded-lg bg-white">
      <div className="p-4 font-Inter flex flex-col h-full">
        <a href={url} target="_blank" rel="noreferrer">
          <div className="h-36 overflow-hidden rounded-lg mb-4">
            <img
              src={image ? image : bookmarkPlaceholder}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </a>

        <h1 className="text-base font-semibold h-20">
          {title ? title : "[No title]"}
        </h1>
        <a
          className="font-Inconsolata text-sm inline-block mb-2"
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          {url}
        </a>
        <p className="h-24 text-sm">
          {description ? description : "[No description]"}
        </p>
        <div className="flex justify-end mt-auto">
          <a className="m-1" href={url} target="_blank" rel="noreferrer">
            <FiLink size="1.5em" />
          </a>
          <button className="m-1" onClick={() => deleteBookmark(bookmark)}>
            <FiTrash2 size="1.5em" color="red" />
          </button>
        </div>
      </div>
    </article>
  );
};

export default BookmarkItem;
