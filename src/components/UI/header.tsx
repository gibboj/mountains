import { Link } from "react-router-dom";

const Header = function () {
  return (
    <header className=" flex justify-end">
      <Link
        className="rounded-b-md px-3 py-2 ml-2 bg-white text-gray-700 font-medium"
        to="/home"
      >
        Home
      </Link>

      <Link
        className="rounded-b-md px-3 py-2 mr-4  ml-2 bg-white text-gray-700 font-medium"
        to="/resume"
      >
        Resume
      </Link>
    </header>
  );
};
export default Header;
