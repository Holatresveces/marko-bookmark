import profilePicture from "../images/profile-icon.jpg";

const Header = () => {
  return (
    <header>
      <h1>Marko</h1>
      <div>
        <div>My bookmarks</div>
        <div>
          <div>
            <img src={profilePicture} alt="" />
          </div>
          <div>
            <div>Welcome</div>
            <div>Johana Doe</div>
          </div>
          <div>V</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
