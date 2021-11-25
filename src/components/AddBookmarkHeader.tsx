import { IoMdClose } from "react-icons/io";

interface Props {
  toggleAddBookmarkDialog: () => void;
}

const AddBookmarkHeader = ({ toggleAddBookmarkDialog }: Props) => {
  return (
    <div className="bg-indigo-600">
      <div className="p-7 flex justify-between items-center text-white">
        <h2 className="font-medium">Create a new bookmark</h2>{" "}
        <span className="cursor-pointer" onClick={toggleAddBookmarkDialog}>
          <IoMdClose size="1.5em" />
        </span>
      </div>
    </div>
  );
};

export default AddBookmarkHeader;
