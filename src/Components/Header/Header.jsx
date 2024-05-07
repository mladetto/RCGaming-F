import Marquee from "../Marquee/Marquee";
import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";

const Header = () => {
  return (
    <>
      <div className="sticky-top d-flex flex-column">
        <Marquee />
        <Search />
        <Navbar />
      </div>
    </>
  );
};

export default Header;
