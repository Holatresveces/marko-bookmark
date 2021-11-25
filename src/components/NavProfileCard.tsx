import { IoIosArrowDown } from "react-icons/io";
import profilePicture from "../images/profile-icon.jpg";

const NavProfileCard = () => {
  return (
    <div className="flex items-center ml-16">
      <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
        <img src={profilePicture} alt="" />
      </div>
      <div>
        <div className="text-xs font-normal text-gray-400">Welcome</div>
        <div className="font-medium">Paquita Cabeza</div>
      </div>
      <div className="w-10 h-10 flex items-center justify-center">
        <span className="cursor-pointer">
          <IoIosArrowDown />
        </span>
      </div>
    </div>
  );
};

export default NavProfileCard;
