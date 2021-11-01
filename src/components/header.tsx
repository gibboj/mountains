import {
  Link
} from "react-router-dom";

const Header = function () {
  return (
    <header className=" flex justify-end">

      <Link className="rounded-b-sm px-3 py-2 bg-yellow-300" to="/home">Home</Link>
      <Link className="rounded-b-sm px-3 py-2 bg-yellow-300 " to="/climbing">Climbing</Link>
      <Link className="rounded-b-sm px-3 py-2 mr-4 bg-yellow-300" to="/Resume">Resume</Link>
    </header>)
}
export default Header;