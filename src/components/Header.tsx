import { Link } from "react-router-dom";
import logo from "../assets/fresse-logo.png";

export function Header() {
  return (
    <header className="bg-zinc-800 text-white w-full h-32 flex justify-between items-start px-8 pt-4">
      <Link
        to="/"
        className="w-24 h-24  flex items-center justify-center mt-2  shadow-lg "
      >
        <img
          src={logo}
          alt="Fresse logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-30 lg:h-30 object-contain"
        />
      </Link>

      <h1 className="text-3xl font-black tracking-widest mt-6">BOWL-LASKURI</h1>

      <div className="bg-[#A2D135] text-black rounded-b-3xl rounded-t-xl px-6 py-4 flex flex-col gap-2 min-w-[200px] shadow-md">
        <Link
          to="/"
          className="font-semibold hover:text-zinc-700 transition-colors"
        >
          Home
        </Link>
        <Link
          to="/community"
          className="font-semibold hover:text-zinc-700 transition-colors"
        >
          Saved recipes
        </Link>
        <Link
          to="/print"
          className="font-semibold hover:text-zinc-700 transition-colors"
        >
          Print
        </Link>
      </div>
    </header>
  );
}

export default Header;
