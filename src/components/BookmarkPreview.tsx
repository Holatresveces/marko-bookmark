import { ChangeEvent } from "react";
import bookmarkPlaceholder from "../images/bookmark-header-placeholder.png";

interface Props {
  image: string | null;
  status: "idle" | "loading" | "resolved" | "rejected";
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  title: string | null;
  description: string | null;
}

const BookmarkPreview = ({
  image,
  status,
  handleInputChange,
  title,
  description,
}: Props) => {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow bg-gray-300 h-px"></div>
        <span className="px-2 text-gray-400">Preview</span>
        <div className="flex-grow bg-gray-300 h-px"></div>
      </div>

      <div className="font-medium">Meta Image</div>
      <div className="w-full h-44 bg-gray-100 rounded-md overflow-hidden">
        {status === "resolved" && (
          <img
            className="w-full h-full object-cover"
            src={image ? image : bookmarkPlaceholder}
            alt=""
          />
        )}
      </div>

      <div>
        <label className="font-medium" htmlFor="title">
          Meta Title
        </label>
      </div>
      <input
        id="title"
        disabled={status === "loading"}
        name="title"
        onChange={handleInputChange}
        placeholder="Ex. Welcome to my website"
        type="text"
        value={title || ""}
      />

      <div>
        <label className="font-medium" htmlFor="description">
          Meta Description
        </label>
      </div>
      <textarea
        disabled={status === "loading"}
        id="description"
        name="description"
        onChange={handleInputChange}
        value={description || ""}
      ></textarea>
    </>
  );
};

export default BookmarkPreview;
