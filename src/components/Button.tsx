interface Props {
  onClick: () => void;
  text: string;
}

const Button = ({ onClick, text }: Props) => {
  return (
    <button
      className="bg-indigo-600 text-white py-4 px-6 rounded-md font-Inter font-medium"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
