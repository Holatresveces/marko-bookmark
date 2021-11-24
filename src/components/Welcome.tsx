import Button from "./Button";

interface Props {
  toggleAddBookmarkDialog: () => void;
}

const Welcome = ({ toggleAddBookmarkDialog }: Props) => {
  return (
    <div className="max-w-md mx-auto mt-32 flex flex-col items-center">
      <h1 className="font-semibold text-3xl mb-2">Welcome to Marko</h1>
      <div className="w-12 h-1 bg-indigo-600 mb-9"></div>
      <p className="text-gray-500 text-center text-xl mb-9">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <Button text="Add new bookmark" onClick={toggleAddBookmarkDialog} />
    </div>
  );
};

export default Welcome;
