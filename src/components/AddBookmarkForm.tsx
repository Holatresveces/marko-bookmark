import { ChangeEvent } from "react";
import BookmarkPreview from "./BookmarkPreview";
import { AsyncMetadataState } from "../interfaces/index";

interface Props {
  state: AsyncMetadataState;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  fetchMetadata: () => void;
  handleSaveBookmark: () => void;
}

const AddBookmarkForm = ({
  state,
  handleInputChange,
  fetchMetadata,
  handleSaveBookmark,
}: Props) => {
  const { newBookmark, status } = state;
  const { description, title, image, url } = newBookmark;

  return (
    <div className="p-7">
      <form>
        <div className="mb-2">
          <label className="font-medium" htmlFor="url">
            Insert your URL
          </label>
        </div>
        <input
          className="block w-full p-2 border-solid border-2 border-black rounded-md mb-2"
          id="name"
          disabled={status === "loading"}
          name="url"
          onChange={handleInputChange}
          placeholder="https://company.com"
          type="text"
          value={url || ""}
        />

        <input
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium cursor-pointer"
          disabled={status === "loading"}
          onClick={fetchMetadata}
          placeholder="https://company.com"
          type="button"
          value="Load metadata"
        />

        <BookmarkPreview
          image={image}
          status={status}
          handleInputChange={handleInputChange}
          title={title}
          description={description}
        />

        <input
          className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md font-Inter font-medium cursor-pointer"
          disabled={status === "loading"}
          onClick={handleSaveBookmark}
          type="button"
          value="Save bookmark"
        />
        {/* For debugging purposes */}
        {/* <pre className="debug">{JSON.stringify(state, null, 3)}</pre> */}
      </form>
    </div>
  );
};

export default AddBookmarkForm;
