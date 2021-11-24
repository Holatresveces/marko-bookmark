import { IoIosArrowDown } from "react-icons/io";
import profilePicture from "../images/profile-icon.jpg";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center p-5">
          <h1 className="font-bold text-xl">Marko</h1>
          <div className="flex items-center font-Inter">
            <div className="font-semibold">My bookmarks</div>
            <div className="flex items-center ml-16">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={profilePicture} alt="" />
              </div>
              <div>
                <div className="text-xs font-normal text-gray-400">Welcome</div>
                <div className="font-medium">Johana Doe</div>
              </div>
              <div className="w-10 h-10 flex items-center justify-center">
                <span className="cursor-pointer">
                  <IoIosArrowDown />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
