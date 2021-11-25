import NavProfileCard from "./NavProfileCard";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="font-bold text-xl">Marko</h1>
        <div className="flex items-center font-Inter">
          <div className="font-semibold">My bookmarks</div>
          <NavProfileCard />
        </div>
      </div>
    </header>
  );
};

export default Header;
